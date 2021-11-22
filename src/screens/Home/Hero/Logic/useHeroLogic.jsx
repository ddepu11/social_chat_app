import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  doc,
  onSnapshot,
  orderBy,
  query,
  collection,
  addDoc,
} from 'firebase/firestore';
import { firestoreInstance } from '../../../../config/firebase';
import { notificationShowError } from '../../../../features/notification';
import { setRoomId } from '../../../../features/room';

const useHeroLogic = () => {
  const dispatch = useDispatch();

  const { info, id } = useSelector((state) => state.user.value);
  const [message, setMessage] = useState('');
  const [btnActive, setBtnActive] = useState(false);

  const [loading, setLoading] = useState(true);
  const { roomId } = useParams();

  const bottomDivRef = useRef(null);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const saveMessageDoc = async () => {
    try {
      await addDoc(collection(firestoreInstance, 'rooms', roomId, 'messages'), {
        message,
        name: info.fullName,
        createdOn: Date.now(),
        userId: id,
      });
    } catch (err) {
      dispatch(notificationShowError({ msg: err.code.toString().slice(5) }));
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message) {
      dispatch(notificationShowError({ msg: 'Message is empty!' }));
    } else {
      saveMessageDoc();

      setMessage('');
    }
  };

  // Disable / Enable send message button
  useEffect(() => {
    if (message) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }, [message]);

  const [roomDetails, setRoomDetails] = useState(null);
  const [messages, setMessages] = useState([]);

  // Fetching Rooms
  useEffect(() => {
    setLoading(true);

    let unsub;

    if (roomId) {
      dispatch(setRoomId(roomId));

      unsub = onSnapshot(doc(firestoreInstance, 'rooms', roomId), (snap) => {
        setRoomDetails({ id: snap.id, ...snap.data() });
        setLoading(false);
      });
    }

    return () => {
      unsub();
    };
  }, [roomId, dispatch]);

  // Fetching Room's messages
  useEffect(() => {
    let unsub1;

    if (roomId) {
      const q = query(
        collection(firestoreInstance, 'rooms', roomId, 'messages'),
        orderBy('createdOn', 'asc')
      );

      unsub1 = onSnapshot(q, (snap) => {
        setLoading(true);

        let index = 0;
        const newMessages = [];

        snap.forEach((item) => {
          newMessages.push({ id: item.id, ...item.data() });

          if (snap.size - 1 === index) {
            setMessages(newMessages);
            setLoading(false);

            bottomDivRef.current.scrollIntoView();
          }

          index += 1;
        });

        if (snap.size === 0) {
          setLoading(false);
          setMessages([]);
        }
      });
    }

    return () => {
      setLoading(false);
      unsub1();
    };
  }, [roomId]);

  return {
    id,
    message,
    handleMessage,
    handleSendMessage,
    roomDetails,
    loading,
    messages,
    btnActive,
    bottomDivRef,
  };
};

export default useHeroLogic;
