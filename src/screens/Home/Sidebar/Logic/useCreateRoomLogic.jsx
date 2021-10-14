import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { firestoreInstance } from '../../../../config/firebase';
import { notificationShowError } from '../../../../features/notification';
import { userLoadingEnds } from '../../../../features/user';

const useCreateRoomLogic = () => {
  const dispatch = useDispatch();

  const { info } = useSelector((state) => state.user.value);
  const [room, setRoom] = useState('');
  const [showCreateRoomDialog, setShowCreateRoomDialog] = useState(false);

  const showCRD = async () => {
    setShowCreateRoomDialog(true);
    // try {
    //   const docRef = await addDoc(collection(firestoreInstance, 'cities'), '');
    // } catch (err) {
    //   dispatch(notificationShowError({ msg: err.code.toString().slice(5) }));
    //   dispatch(userLoadingEnds());
    // }
  };

  const hideCRD = async () => {
    setShowCreateRoomDialog(false);
  };

  const handleRoom = (e) => {
    setRoom(e.target.value);
  };

  return {
    showCRD,
    room,
    handleRoom,
    showCreateRoomDialog,
    hideCRD,
  };
};

export default useCreateRoomLogic;
