import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

import {
  firestoreInstance,
  storageInstance,
} from '../../../../config/firebase';

import setValidationMessage from '../../../../utils/setValidationMessage';
import { notificationShowError } from '../../../../features/notification';
import { userLoadingEnds } from '../../../../features/user';

const useCreateRoomLogic = () => {
  const dispatch = useDispatch();

  const [room, setRoom] = useState('');
  const [loading, setLoading] = useState(false);

  const [roomImage, setRoomImage] = useState({
    file: null,
    preview: '',
  });

  const [showCreateRoomDialog, setShowCreateRoomDialog] = useState(false);

  const showCRD = async () => {
    setShowCreateRoomDialog(true);
  };

  const hideCRD = async () => {
    setShowCreateRoomDialog(false);

    setRoom('');

    setRoomImage({
      file: null,
      preview: '',
    });
  };

  const roomImageValidationMessageTag = useRef();
  const roomValidationMessageTag = useRef();

  const lastSetTimeOutId = useRef();

  const handleRoomInput = (e) => {
    setRoom(e.target.value);
  };

  const handleRoomImage = (e) => {
    const file = e.target.files[0];
    setRoomImage({ file, preview: URL.createObjectURL(file) });
  };

  const validateImageAndRoom = () => {
    let error = false;

    if (roomImage.file === null) {
      setValidationMessage(
        'You must select display picture!',
        'error',
        lastSetTimeOutId,
        roomImageValidationMessageTag
      );
      error = true;
    }

    if (room.length > 20) {
      setValidationMessage(
        'room name is too lengthy!',
        'error',
        lastSetTimeOutId,
        roomValidationMessageTag
      );
      error = true;
    }

    if (room.trim().length < 2) {
      setValidationMessage(
        'room name is too short!',
        'error',
        lastSetTimeOutId,
        roomValidationMessageTag
      );
      error = true;
    }

    if (room === '') {
      setValidationMessage(
        "room name can't be empty!",
        'error',
        lastSetTimeOutId,
        roomValidationMessageTag
      );
      error = true;
    }

    return error;
  };

  const saveRoomDocInFirestore = async (picUrl, picName) => {
    try {
      await addDoc(collection(firestoreInstance, 'rooms'), {
        name: room,
        pic: {
          fileName: picName,
          url: picUrl,
        },
      });
      setLoading(false);
      hideCRD();
    } catch (err) {
      dispatch(notificationShowError({ msg: err.code.toString().slice(5) }));
      dispatch(userLoadingEnds());
    }
  };

  const uploadRoomPic = async () => {
    setLoading(true);
    const picName = `Room_${room}__${Math.floor(Math.random() * Date.now())}`;

    const roomImgRef = ref(
      storageInstance,
      `roomPictures/${picName}.${roomImage.file.type.split('/')[1]}`
    );

    try {
      await uploadBytes(roomImgRef, roomImage.file);

      const picUrl = await getDownloadURL(roomImgRef);
      saveRoomDocInFirestore(picUrl, picName);
    } catch (err) {
      dispatch(notificationShowError({ msg: err.code.toString().slice(5) }));
      dispatch(userLoadingEnds());
    }
  };

  const handleCreateRoom = () => {
    const error = validateImageAndRoom();

    if (!error) {
      uploadRoomPic();
    }
  };

  return {
    showCRD,
    room,
    handleRoomInput,
    showCreateRoomDialog,
    hideCRD,
    handleCreateRoom,
    handleRoomImage,
    roomImage,
    roomImageValidationMessageTag,
    roomValidationMessageTag,
    loading,
  };
};

export default useCreateRoomLogic;
