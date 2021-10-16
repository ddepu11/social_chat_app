// import { collection, addDoc } from 'firebase/firestore';
import { useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { firestoreInstance } from '../../../../config/firebase';
// import { notificationShowError } from '../../../../features/notification';
// import { userLoadingEnds } from '../../../../features/user';
import setValidationMessage from '../../../../utils/setValidationMessage';

const useCreateRoomLogic = () => {
  // const dispatch = useDispatch();

  // const { info } = useSelector((state) => state.user.value);
  const [showCreateRoomDialog, setShowCreateRoomDialog] = useState(false);

  const showCRD = async () => {
    setShowCreateRoomDialog(true);
  };

  const hideCRD = async () => {
    setShowCreateRoomDialog(false);
  };

  const [roomImage, setRoomImage] = useState({
    file: null,
    preview: '',
  });
  const [room, setRoom] = useState('');

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

    if (room.length < 2) {
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

  const handleCreateRoom = () => {
    const error = validateImageAndRoom();

    console.log(error);
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
  };
};

export default useCreateRoomLogic;
