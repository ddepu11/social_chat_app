import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';

import { authInstance } from '../../../../config/firebase';
import {
  notificationShowError,
  notificationShowInfo,
} from '../../../../features/notification';
import { userLoadingEnds } from '../../../../features/user';

const useSidebarLogic = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // const { info } = useSelector((state) => state.user.value);

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

  const createNewRoom = (e) => {
    console.log(e.target);
  };

  return {
    openProfileSidebar,
    profileSidebarRef,
    closeProfileSidebar,
    logOutUser,
    createNewRoom,
  };
};

export default useSidebarLogic;
