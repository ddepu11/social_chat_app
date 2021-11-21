import styled from 'styled-components';
import dummyDp from '../../../images/dummyDp.png';
import useHeroLogic from './Logic/useHeroLogic';
import Button from '../../../components/Button';
import CircleLoader from '../../../components/CircleLoader';

const Hero = () => {
  const {
    message,
    handleMessage,
    handleSendMessage,
    roomDetails,
    messages,
    id,
    loading,
    bottomDivRef,
  } = useHeroLogic();

  if (loading) {
    return (
      <CircleLoader
        wrapperMargin='0 330px'
        wrapperH='90%'
        cirH='100px'
        cirW='100px'
      />
    );
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

            {messages.length > 0 && (
              <span className='last_name'>
                last seen at&nbsp;&nbsp;
                {new Date(
                  messages[messages.length - 1]?.createdOn
                ).toLocaleDateString('en-IN')}
                &nbsp;&nbsp;&nbsp;
                {new Date(
                  messages[messages.length - 1]?.createdOn
                ).toLocaleTimeString('en-IN')}
                {/* {new Date(
                messages[messages.length - 1]?.createdOn?.toDate()
              ).toUTCString()} */}
              </span>
            )}
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
                {new Date(item.createdOn).toLocaleDateString('en-IN')}
                &nbsp;&nbsp;&nbsp;
                {new Date(item.createdOn).toLocaleTimeString('en-IN')}
              </span>
            </p>
          ))}

        <div ref={bottomDivRef} />
      </div>

      <div className='footer'>
        <form onSubmit={handleSendMessage}>
          <label htmlFor='message'>Message</label>

          <input
            type='text'
            id='message'
            placeholder='write your message here...'
            value={message}
            onChange={handleMessage}
          />

          <Button
            type='submit'
            bSh=''
            transform='scale(1)'
            bgColor='#1b1b1b'
            width='12%'
            padding='5px 00'
            margin='0px 0 0 10px'
            color='#fdfdfd'
            fWeight='400'
            fs='0.9em'
            borderRadius='5px'
          >
            Send
          </Button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  width: 65%;
  border: 1px solid #474747da;
  height: 100%;
  /* transition: all 1s ease; */

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
        margin-left: 18px;

        h3 {
          font-size: 1em;
          font-weight: 500;
        }

        span {
          font-size: 0.7em;
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
      font-weight: 400;
      font-size: 0.9em;
      position: relative;
      margin-bottom: 60px;
      /* border-top-left-radius: 0%; */

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
      border-top-right-radius: 0%;
    }

    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }

  .footer {
    padding: 0px 12px;
    height: 6%;
    /* border: 1px solid red; */

    form {
      label {
        font-size: 1em;
        font-weight: 500;
      }

      input {
        padding: 5px 10px;
        border-radius: 2px;
        width: 72%;
        margin-left: 15px;
      }
    }
  }
`;

export default Hero;
