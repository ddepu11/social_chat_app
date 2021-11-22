import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { authInstance, firestoreInstance } from '../../../../config/firebase';
import {
  notificationShowError,
  notificationShowInfo,
} from '../../../../features/notification';
import { userLoadingEnds } from '../../../../features/user';

const useSidebarLogic = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentRoomId } = useSelector((state) => state.room.value);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(firestoreInstance, 'rooms'), (snap) => {
      let index = 0;
      const newRooms = [];

      snap.forEach((item) => {
        newRooms.push({ id: item.id, ...item.data() });

        if (index === snap.size - 1) {
          setRooms(newRooms);
        }
        index += 1;
      });
    });

    return () => {
      unsub();
    };
  }, [dispatch]);

  const profileSidebarRef = useRef(null);

  const openProfileSidebar = () => {
    profileSidebarRef.current.classList.add('show');
  };

  const closeProfileSidebar = () => {
    profileSidebarRef.current.classList.remove('show');
  };

  const logOutUser = () => {
    authInstance
      .signOut()
      .then(() => {
        history.push('/login');

        dispatch(notificationShowInfo({ msg: 'Successfully logged out' }));
      })
      .catch((err) => {
        dispatch(notificationShowError({ msg: err.code.toString().slice(5) }));
        dispatch(userLoadingEnds());
      });
  };

  return {
    openProfileSidebar,
    profileSidebarRef,
    closeProfileSidebar,
    logOutUser,
    rooms,
    currentRoomId,
  };
};

export default useSidebarLogic;
