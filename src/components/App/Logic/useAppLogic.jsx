import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDocs, query, where, collection } from 'firebase/firestore';
import useNotification from '../../../screens/useNotification';
import {
  notificationClear,
  notificationShowError,
  // notificationShowInfo,
} from '../../../features/notification';
import {
  userLoadingBegins,
  userLoadingEnds,
  userLoggedIn,
  userLoggedOut,
} from '../../../features/user';
import { authInstance, firestoreInstance } from '../../../config/firebase';

const useAppLogic = () => {
  const dispatch = useDispatch();

  const { errorNotification, successNotification, infoNotification } =
    useNotification();

  const { hasUserLoggedIn, userLoading } = useSelector(
    (state) => state.user.value
  );

  const { message, success, error, info } = useSelector(
    (state) => state.notification.value
  );

  useEffect(() => {
    dispatch(userLoadingBegins());

    const fetchUserData = async (email) => {
      try {
        const usersRef = collection(firestoreInstance, 'users');

        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          // dispatch(
          //   notificationShowInfo({ msg: `Welcome back ${doc.data().fullName}` })
          // );

          dispatch(userLoggedIn({ id: doc.id, info: doc.data() }));
        });
      } catch (err) {
        dispatch(notificationShowError({ msg: err.code.toString().slice(5) }));
        dispatch(userLoadingEnds());
      }
    };

    const unsub = authInstance.onAuthStateChanged((user) => {
      if (user && user.providerData.length > 0) {
        const { email } = user.providerData[0];

        fetchUserData(email);
      } else {
        authInstance.signOut();
        dispatch(userLoggedOut());
        dispatch(userLoadingEnds());
      }
    });

    return () => {
      unsub();
    };
  }, [dispatch]);

  // Handling notifications here.
  useEffect(() => {
    if (message && success) {
      dispatch(notificationClear());
      successNotification(message);
    }

    if (error) {
      dispatch(notificationClear());
      errorNotification(message);
    }

    if (message && info) {
      dispatch(notificationClear());
      infoNotification(message);
    }
  }, [
    message,
    success,
    error,
    info,
    successNotification,
    errorNotification,
    infoNotification,
    dispatch,
  ]);

  return { hasUserLoggedIn, userLoading };
};

export default useAppLogic;
