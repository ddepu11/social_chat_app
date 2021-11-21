import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import dummyDp from '../images/dummyDp.png';
import { firestoreInstance } from '../config/firebase';
import { notificationShowError } from '../features/notification';

const ChatRoom = ({ room }) => {
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let unsub;
    const fetchData = async () => {
      try {
        const messagesRef = collection(
          firestoreInstance,
          'rooms',
          room.id,
          'messages'
        );

        const q = query(messagesRef, orderBy('createdOn', 'desc'));

        unsub = onSnapshot(q, (snap) => {
          let index = 0;
          const newMessages = [];

          snap.forEach((item) => {
            newMessages.push({ id: item.id, ...item.data() });

            if (snap.size - 1 === index) {
              setMessages(newMessages);
            }
            index += 1;
          });

          if (snap.size === 0) {
            setMessages(newMessages);
          }
        });
      } catch (err) {
        dispatch(notificationShowError({ msg: err.code.toString().slice(5) }));
      }
    };

    fetchData();

    return () => {
      unsub();
    };
  }, [room.id, dispatch]);

  return (
    <Wrapper key={room.id} id={room.id}>
      <Link to={`/room/${room.id}`} className='room flex'>
        <div className='room_left flex'>
          <div className='room_img'>
            <img
              src={room && room.pic.url === '' ? dummyDp : room.pic.url}
              alt=''
            />
          </div>

          <div className='room_name_and_last_message flex'>
            <h3 className='room_name'>{room.name}</h3>
            <p className='last_messge'>{messages[0]?.message}</p>
          </div>
        </div>

        {messages.length > 0 && (
          <span className='last_updated'>
            {new Date(messages[0]?.createdOn).toLocaleDateString('en-IN')}
            &nbsp;&nbsp;&nbsp;
            {new Date(messages[0]?.createdOn).toLocaleTimeString('en-IN')}
          </span>
        )}
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .room {
    justify-content: space-between;
    padding: 10px 14px;
    transition: all 0.2s ease;

    &:hover {
      background: #444444;
      p {
        color: #ffffff;
      }
    }

    .last_updated {
      font-size: 0.6em;
    }
  }

  .room_img {
    width: 40px;
    height: 40px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .room_name_and_last_message {
    flex-direction: column;
    align-items: flex-start;
  }

  .room_name {
    font-weight: 500;
    font-size: 0.9em;
    margin-left: 10px;
  }

  p {
    font-weight: 500;
    font-size: 0.7em;
    margin-left: 10px;
    color: #949494;
  }
`;

ChatRoom.propTypes = {
  room: PropTypes.object.isRequired,
};

export default ChatRoom;
