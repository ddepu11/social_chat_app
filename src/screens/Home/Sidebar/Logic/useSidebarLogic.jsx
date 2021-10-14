import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useRef, useState } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { authInstance, firestoreInstance } from '../../../../config/firebase';
import {
  notificationShowError,
  notificationShowInfo,
} from '../../../../features/notification';
import setValidationMessage from '../../../../utils/setValidationMessage';
import {
  updateInfo,
  userLoadingBegins,
  userLoadingEnds,
} from '../../../../features/user';

const useSidebarLogic = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { info, id } = useSelector((state) => state.user.value);

  const [credentials, setUserCredentials] = useState({
    fullName: info.fullName,
    userName: info.userName,
    about: info.about,
  });

  const lastSetTimeOutId = useRef(0);
  const profileSidebarRef = useRef(null);

  const fullNameValidationMT = useRef(null);
  const userNameValidationMT = useRef(null);
  const aboutValidationMT = useRef(null);

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

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...credentials, [name]: value });
  };

  const updateUserInfo = async () => {
    dispatch(userLoadingBegins());

    const userRef = doc(firestoreInstance, 'users', id);

    try {
      await updateDoc(userRef, credentials);

      const userSnap = await getDoc(userRef);

      userSnap.data();

      dispatch(updateInfo(userSnap.data()));
    } catch (err) {
      dispatch(notificationShowError({ msg: err.code.toString().slice(5) }));
      dispatch(userLoadingEnds());
    }
  };

  const validateCredentials = () => {
    let error = false;

    // About
    if (credentials.about.length > 80) {
      setValidationMessage(
        'about is too lengthy!',
        'error',
        lastSetTimeOutId,
        aboutValidationMT
      );
      error = true;
    }

    if (credentials.about.length < 2) {
      setValidationMessage(
        'about is too short!',
        'error',
        lastSetTimeOutId,
        aboutValidationMT
      );
      error = true;
    }

    if (credentials.about === '') {
      setValidationMessage(
        'about cant be empty!',
        'error',
        lastSetTimeOutId,
        aboutValidationMT
      );
      error = true;
    }

    // User Name
    if (credentials.userName.length > 20) {
      setValidationMessage(
        'user name is too lengthy!',
        'error',
        lastSetTimeOutId,
        userNameValidationMT
      );
      error = true;
    }

    if (credentials.userName.length < 2) {
      setValidationMessage(
        'user name is too short!',
        'error',
        lastSetTimeOutId,
        userNameValidationMT
      );
      error = true;
    }

    if (credentials.userName === '') {
      setValidationMessage(
        'user name cant be empty!',
        'error',
        lastSetTimeOutId,
        userNameValidationMT
      );
      error = true;
    }

    // Full Name
    if (credentials.fullName.length > 20) {
      setValidationMessage(
        'full name is too lengthy!',
        'error',
        lastSetTimeOutId,
        fullNameValidationMT
      );
      error = true;
    }

    if (credentials.fullName.length < 2) {
      setValidationMessage(
        'full name is too short!',
        'error',
        lastSetTimeOutId,
        fullNameValidationMT
      );
      error = true;
    }

    if (credentials.fullName === '') {
      setValidationMessage(
        'full name cant be empty!',
        'error',
        lastSetTimeOutId,
        fullNameValidationMT
      );
      error = true;
    }

    return error;
  };

  const handleUpdate = () => {
    if (
      credentials.fullName === info.fullName &&
      credentials.userName === info.userName &&
      credentials.about === info.about
    ) {
      dispatch(notificationShowError({ msg: 'Nothing to update!' }));
    } else {
      const error = validateCredentials();

      if (!error) {
         updateUserInfo();
      }
    }
  };

  const cancelUpdate = () => {
    setUserCredentials({
      fullName: info.fullName,
      userName: info.userName,
      about: info.about,
    });
  };

  return {
    openProfileSidebar,
    profileSidebarRef,
    closeProfileSidebar,
    logOutUser,
    info,
    handleInput,
    credentials,
    fullNameValidationMT,
    userNameValidationMT,
    aboutValidationMT,
    handleUpdate,
    cancelUpdate,
  };
};

export default useSidebarLogic;
