import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { IoMdArrowRoundBack } from 'react-icons/io';
import dummyDp from '../../../images/dummyDp.png';
import Button from '../../../components/Button';

const Sidebar = () => {
  const createNewRoom = (e) => {
    console.log(e.target);
  };

  return (
    <Wrapper>
      <div className='top flex'>
        <div className='to_left flex'>
          <div className='dp'>
            <img src={dummyDp} alt='' />
          </div>

          <span className='user_name'>ddepu11</span>
        </div>

        <div className='btns'>
          <Button
            bgColor='transparent'
            bSh=''
            transform='scale(1)'
            fs='1.2em'
            handleClick={createNewRoom}
            margin='0 20px 0 0'
          >
            <AiOutlinePlus style={{ pointerEvents: 'none' }} />
          </Button>

          <Button
            bgColor='transparent'
            bSh=''
            transform='scale(1)'
            fs='1.2em'
            handleClick={createNewRoom}
            margin='0 5px 0 0'
          >
            <FiLogOut style={{ pointerEvents: 'none' }} />
          </Button>
        </div>
      </div>

      <div className='chat_rooms'>
        <div className='room flex'>
          <div className='room_left flex'>
            <div className='room_img'>
              <img src={dummyDp} alt='' />
            </div>

            <h3 className='room_name'>Chat Room 1</h3>
          </div>

          <span className='last_updated'>4:23</span>
        </div>
      </div>

      <div className='sidebar_cover'>
        <div className='cover_top flex'>
          <Button
            bgColor='transparent'
            bSh=''
            transform='scale(1)'
            fs='1.5em'
            margin='0 20px 0 0'
          >
            <IoMdArrowRoundBack style={{ pointerEvents: 'none' }} />
          </Button>

          <h2 className='cover_heading'>Profile</h2>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  width: 30%;
  height: 100%;
  border: 1px dashed #3b3b3b;
  position: relative;

  .top {
    justify-content: space-between;
    padding: 14px 15px;

    .dp {
      width: 40px;
      height: 40px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .dp:hover {
      cursor: pointer;
    }

    .user_name {
      margin-left: 10px;
    }
  }

  .chat_rooms {
    margin-top: 20px;

    .room {
      justify-content: space-between;
      padding: 10px 14px;

      .room_img {
        width: 40px;
        height: 40px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .room_name {
        font-weight: 500;
        font-size: 0.9em;
        margin-left: 10px;
      }
    }

    .room:hover {
      background: #333;
      cursor: pointer;
    }
  }

  .sidebar_cover {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #333;

    .cover_top {
      border: 1px solid red;
      height: 15vh;

      .cover_heading {
        font-size: 1.2em;
        font-weight: 400;
      }
    }
  }
`;

export default Sidebar;
