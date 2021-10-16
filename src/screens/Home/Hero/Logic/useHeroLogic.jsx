import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  doc,
  onSnapshot,
  orderBy,
  query,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { firestoreInstance } from '../../../../config/firebase';
import { notificationShowError } from '../../../../features/notification';
import { userLoadingEnds } from '../../../../features/user';

const useHeroLogic = () => {
  const dispatch = useDispatch();

  const { info, id } = useSelector((state) => state.user.value);
  const [message, setMessage] = useState('');
  const [btnActive, setBtnActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const { roomId } = useParams();

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const saveMessageDoc = async () => {
    try {
      await addDoc(collection(firestoreInstance, 'rooms', roomId, 'messages'), {
        message,
        name: info.fullName,
        timestamp: serverTimestamp(),
        userId: id,
      });
      setLoading(false);
    } catch (err) {
      dispatch(notificationShowError({ msg: err.code.toString().slice(5) }));
      dispatch(userLoadingEnds());
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message) {
      alert('Please write something');
    } else {
      saveMessageDoc();
      setMessage('');
    }
  };

  useEffect(() => {
    if (message) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }, [message]);

  const [roomDetails, setRoomDetails] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setLoading(true);

    let unsub;

    if (roomId) {
      unsub = onSnapshot(doc(firestoreInstance, 'rooms', roomId), (snap) => {
        setRoomDetails({ id: snap.id, ...snap.data() });
        setLoading(false);
      });
    }

    return () => {
      unsub();
    };
  }, [roomId]);

  useEffect(() => {
    let unsub1;

    if (roomId) {
      const q = query(
        collection(firestoreInstance, 'rooms', roomId, 'messages'),
        orderBy('timestamp', 'asc')
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
          }
          index += 1;
        });

        if (snap.size === 0) {
          setLoading(false);
          setMessages(newMessages);
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
  };
};

export default useHeroLogic;
