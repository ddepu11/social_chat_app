import styled from 'styled-components';
import dummyDp from '../../../images/dummyDp.png';
import useHeroLogic from './Logic/useHeroLogic';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';

const Hero = () => {
  const {
    message,
    handleMessage,
    handleSendMessage,
    roomDetails,
    loading,
    messages,
    id,
  } = useHeroLogic();

  if (loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <div className='header'>
        <div className='left flex'>
          <div className='dp'>
            <img
              src={
                roomDetails && roomDetails.pic.url === ''
                  ? dummyDp
                  : roomDetails.pic.url
              }
              alt=''
            />
          </div>

          <div className='name_and_last_seen'>
            <h3>{roomDetails && roomDetails.name}</h3>
            <span className='last_name'>
              last seen at&nbsp;
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()}
            </span>
          </div>
        </div>
      </div>
      <div className='chat_body'>
        {messages.length !== 0 &&
          messages.map((item) => (
            <p
              key={item.id}
              className={`chat_message ${
                id === item.userId && 'chat_message_recieved'
              }`}
            >
              {item.message}
              <span className='user_name'>{item.name}</span>
              <span className='timestamp'>
                {new Date(item.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          ))}
      </div>

      <div className='footer'>
        <form onSubmit={handleSendMessage}>
          <label htmlFor='message'>message:</label>
          <input
            type='text'
            id='message'
            placeholder='wirite your message'
            value={message}
            onChange={handleMessage}
          />

          <Button
            type='submit'
            bSh=''
            transform='scale(1)'
            bgColor='#1b1b1b'
            width='10%'
            padding='5px 00'
            margin='0px 0 0 10px'
            color='#fdfdfd'
            fWeight='400'
            fs='0.9em'
            borderRadius='10px'
          >
            Send
          </Button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  border: 1px dashed #474747da;
  width: 70%;
  height: 100%;

  .header {
    background: #323739;
    padding: 12px 15px;

    .left {
      justify-content: flex-start;

      .dp {
        width: 40px;
        height: 40px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }

      .name_and_last_seen {
        margin-left: 15px;

        h3 {
          font-size: 1em;
        }
        span {
          font-size: 0.8em;
          color: #bbbbbb;
        }
      }
    }
  }

  .chat_body {
    padding: 30px;
    overflow-y: scroll;
    height: 84%;

    .chat_message {
      background: #262d31;
      padding: 5px 10px;
      width: fit-content;
      border-radius: 5px;
      font-weight: 600;
      font-size: 0.9em;
      position: relative;
      margin-bottom: 40px;

      .user_name {
        position: absolute;
        top: -18px;
        left: 4px;
        font-size: xx-small;
        color: #f3f3f3;
      }

      .timestamp {
        margin-left: 10px;
        font-size: xx-small;
      }
    }

    .chat_message_recieved {
      margin-left: auto;
      background: #056162;
    }
  }

  .footer {
    padding: 0px 12px;

    form {
      label {
        font-size: 1em;
        font-weight: 500;
      }

      input {
        padding: 5px 10px;
        border-radius: 10px;
        width: 72%;
        margin-left: 15px;
      }
    }
  }
`;

export default Hero;
