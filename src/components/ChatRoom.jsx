import styled from 'styled-components';
import PropTypes from 'prop-types';
import dummyDp from '../images/dummyDp.png';

const ChatRoom = ({ room }) => {
  console.log('ChatRoom');

  return (
    <Wrapper className='flex' key={room.id} id={room.id}>
      <div className='room_left flex'>
        <div className='room_img'>
          <img
            src={room && room.pic.url === '' ? dummyDp : room.pic.url}
            alt=''
          />
        </div>

        <div className='room_name_and_last_message flex'>
          <h3 className='room_name'>{room.name}</h3>
          <p className='last_messge'>Hello there</p>
        </div>
      </div>

      <span className='last_updated'>4:23</span>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  justify-content: space-between;
  padding: 10px 14px;

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
    font-size: 0.85em;
    margin-left: 10px;
    color: #949494;
  }

  &:hover {
    background: #333;
    cursor: pointer;
  }
`;

ChatRoom.propTypes = {
  room: PropTypes.object.isRequired,
};

export default ChatRoom;
