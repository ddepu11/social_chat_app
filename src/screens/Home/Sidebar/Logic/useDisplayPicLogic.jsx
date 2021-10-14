import { useDispatch, useSelector } from 'react-redux';
import {
  uploadBytes,
  getDownloadURL,
  deleteObject,
  ref,
} from 'firebase/storage';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import {
  firestoreInstance,
  storageInstance,
} from '../../../../config/firebase';
import {
  updateInfo,
  userLoadingBegins,
  userLoadingEnds,
} from '../../../../features/user';
import {
  notificationShowError,
  notificationShowSuccess,
} from '../../../../features/notification';

const useDisplayPicLogic = () => {
  const dispatch = useDispatch();
  const { info, id } = useSelector((state) => state.user.value);

  const [handlingChangeDp, setHandlingChangeDp] = useState(false);

  const openChangeDpDialog = () => {
    setHandlingChangeDp(true);
  };

  const cancelChangeDp = () => {
    setHandlingChangeDp(false);
  };

  const closeDialog = (e) => {
    if (e.target.matches('.ChangeDpDialog')) {
      cancelChangeDp();
    }
  };

  // If Display was never set
  const uploadPicAndUpdateUserDoc = async (imageToUpload) => {
    const randomlyGeneratedName = `${info.email}_${Math.floor(
      Math.random() * Date.now()
    )}`;

    const dpStorageRef = ref(
      storageInstance,
      `display_pictures/${randomlyGeneratedName}`
    );

    try {
      await uploadBytes(dpStorageRef, imageToUpload);

      const downloadURL = await getDownloadURL(dpStorageRef);

      const userRef = doc(firestoreInstance, 'users', id);

      await updateDoc(userRef, {
        dp: { fileName: randomlyGeneratedName, url: downloadURL },
      });

      const userSnap = await getDoc(userRef);

      userSnap.data();

      dispatch(updateInfo(userSnap.data()));

      dispatch(
        notificationShowSuccess({
          msg: 'Successfully changed display picture!',
        })
      );
    } catch (err) {
      dispatch(notificationShowError({ msg: err.code.toString().slice(5) }));
      dispatch(userLoadingEnds());
    }
  };

  // If Display is once set
  const deletePreviousDpAndUploadNewOne = async (imageToUpload) => {
    const randomlyGeneratedName = `${info.email}_${Math.floor(
      Math.random() * Date.now()
    )}`;

    const previousDpRef = ref(
      storageInstance,
      `display_pictures/${info.dp.fileName}`
    );

    const newDpRef = ref(
      storageInstance,
      `display_pictures/${randomlyGeneratedName}`
    );

    try {
      await deleteObject(previousDpRef);

      await uploadBytes(newDpRef, imageToUpload);

      const downloadURL = await getDownloadURL(newDpRef);

      const userRef = doc(firestoreInstance, 'users', id);

      await updateDoc(userRef, {
        dp: { fileName: randomlyGeneratedName, url: downloadURL },
      });

      const userSnap = await getDoc(userRef);

      userSnap.data();

      dispatch(updateInfo(userSnap.data()));

      dispatch(notificationShowSuccess({ msg: 'Successfully changed the dp' }));
    } catch (err) {
      dispatch(notificationShowError({ msg: err.code.toString().slice(5) }));
      dispatch(userLoadingEnds());
    }
  };

  const handleDpChange = (e) => {
    cancelChangeDp();

    const { files } = e.target;

    const imageToUpload = Array.from(files)[0];

    if (info.dp.fileName === 'dummyDp') {
      dispatch(userLoadingBegins());
      uploadPicAndUpdateUserDoc(imageToUpload);
    } else {
      dispatch(userLoadingBegins());
      deletePreviousDpAndUploadNewOne(imageToUpload);
    }
  };

  const removeDp = async () => {
    cancelChangeDp();
    const dpRef = ref(storageInstance, `display_pictures/${info.dp.fileName}`);

    dispatch(userLoadingBegins());

    try {
      await deleteObject(dpRef);

      const userRef = doc(firestoreInstance, 'users', id);

      await updateDoc(userRef, {
        dp: { fileName: 'dummyDp', url: '' },
      });

      const userSnap = await getDoc(userRef);

      userSnap.data();

      dispatch(updateInfo(userSnap.data()));

      dispatch(notificationShowSuccess({ msg: 'Successfully removed  dp!' }));
    } catch (err) {
      dispatch(notificationShowError({ msg: err.code.toString().slice(5) }));
      dispatch(userLoadingEnds());
    }
  };

  return {
    handlingChangeDp,
    openChangeDpDialog,
    closeDialog,
    handleDpChange,
    removeDp,
    cancelChangeDp,
  };
};

export default useDisplayPicLogic;
