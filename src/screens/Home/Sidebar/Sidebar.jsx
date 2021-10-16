import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { IoMdArrowRoundBack } from 'react-icons/io';
import dummyDp from '../../../images/dummyDp.png';
import Button from '../../../components/Button';
import useSidebarLogic from './Logic/useSidebarLogic';
import UpdateFormField from '../../../components/UpdateFormField';
import useDisplayPicLogic from './Logic/useDisplayPicLogic';
import useUpdateUserDetails from './Logic/useUpdateUserDetails';
import useCreateRoomLogic from './Logic/useCreateRoomLogic';
import dummyChat from '../../../images/dummyChat.jpg';
import ChatRoom from '../../../components/ChatRoom';

const Sidebar = () => {
  const {
    openProfileSidebar,
    profileSidebarRef,
    closeProfileSidebar,
    logOutUser,
    aboutValidationMT,
    rooms,
  } = useSidebarLogic();

  const {
    handlingChangeDp,
    openChangeDpDialog,
    closeDialog,
    handleDpChange,
    removeDp,
    cancelChangeDp,
  } = useDisplayPicLogic();

  const {
    handleInput,
    handleUpdate,
    cancelUpdate,
    credentials,
    info,
    userNameValidationMT,
    fullNameValidationMT,
  } = useUpdateUserDetails();

  const {
    showCRD,
    showCreateRoomDialog,
    hideCRD,
    room,
    handleRoomInput,
    handleCreateRoom,
    handleRoomImage,
    roomImage,
    roomImageValidationMessageTag,
    roomValidationMessageTag,
    loading,
  } = useCreateRoomLogic();

  return (
    <>
      {handlingChangeDp && (
        <ChangeDpDialog onClick={closeDialog} className='ChangeDpDialog'>
          <div className='center_box flex'>
            <h2 className='heading'>Change Profile Photo</h2>

            <div className='btn'>
              <label htmlFor='dp' className='upload_label_btn'>
                Upload Photo
              </label>

              <input
                type='file'
                accept='.jpg, .jpeg, .png'
                id='dp'
                style={{ display: 'none' }}
                onChange={handleDpChange}
              />
            </div>

            {info.dp.fileName !== 'dummyDp' && (
              <div className='btn'>
                <Button
                  type='button'
                  bSh=''
                  transform='scale(1)'
                  bgColor='transparent'
                  padding='14px 0'
                  width='100%'
                  color='#ee1f1f'
                  fWeight='700'
                  fs='0.9em'
                  handleClick={removeDp}
                >
                  Remove Current Photo
                </Button>
              </div>
            )}

            <div className='btn cancel'>
              <Button
                type='button'
                bSh=''
                transform='scale(1)'
                bgColor='transparent'
                width='100%'
                padding='14px 00'
                color='#fdfdfd'
                fWeight='400'
                fs='0.9em'
                handleClick={cancelChangeDp}
              >
                Cancel
              </Button>
            </div>
          </div>
        </ChangeDpDialog>
      )}

      {showCreateRoomDialog && (
        <CreateRoomDialog onClick={closeDialog} className='ChangeDpDialog'>
          <div className='center_box flex'>
            <h2 className='heading'>Create new room</h2>

            <form className='flex'>
              <div className='room_image '>
                <label className='preview'>
                  <img
                    src={
                      roomImage.preview === '' ? dummyChat : roomImage.preview
                    }
                    alt='preview'
                  />

                  <input
                    id='roomImage'
                    type='file'
                    name='displayPicture'
                    style={{ display: 'none' }}
                    accept='.png, .jpg, .jpeg'
                    onChange={handleRoomImage}
                  />
                </label>

                <span className='text'>
                  Select room pic
                  <span style={{ color: '#dd0a0a', fontSize: '1.2em' }}>
                    {' '}
                    *
                  </span>
                </span>
              </div>

              <p ref={roomImageValidationMessageTag} className='message' />

              <label htmlFor='room' className='room_name'>
                Room Name
              </label>

              <input type='text' value={room} onChange={handleRoomInput} />

              <p ref={roomValidationMessageTag} className='message' />

              <Button
                type='button'
                bSh=''
                transform='scale(1)'
                width='100%'
                padding='5px 00'
                margin='20px 0 0'
                color='#fdfdfd'
                fWeight='400'
                fs='0.9em'
                bgColor='#1b1b1b'
                handleClick={handleCreateRoom}
              >
                Submit
              </Button>

              <Button
                type='button'
                bSh=''
                transform='scale(1)'
                bgColor='#1b1b1b'
                width='100%'
                padding='5px 00'
                margin='10px 0 0'
                color='#fdfdfd'
                fWeight='400'
                fs='0.9em'
                handleClick={hideCRD}
              >
                Cancel
              </Button>
            </form>

            {loading && (
              <div className='loading'>
                <h2>Loading...</h2>
              </div>
            )}
          </div>
        </CreateRoomDialog>
      )}

      <Wrapper>
        <div className='top flex'>
          <div className='to_left flex'>
            <Button
              type='button'
              bgColor='transparent'
              transform='scale(1.05)'
              handleClick={openProfileSidebar}
            >
              <div className='dp'>
                <img
                  src={info && info.dp.url === '' ? dummyDp : info.dp.url}
                  alt=''
                />
              </div>
            </Button>

            <span className='user_name'>ddepu11</span>
          </div>

          <div className='btns'>
            <Button
              bgColor='transparent'
              bSh=''
              transform='scale(1)'
              fs='1.2em'
              margin='0 20px 0 0'
              handleClick={showCRD}
            >
              <AiOutlinePlus style={{ pointerEvents: 'none' }} />
            </Button>

            <Button
              bgColor='transparent'
              bSh=''
              transform='scale(1)'
              fs='1.2em'
              handleClick={logOutUser}
              margin='0 5px 0 0'
            >
              <FiLogOut style={{ pointerEvents: 'none' }} />
            </Button>
          </div>
        </div>

        {rooms.length !== 0 && (
          <div className='chat_rooms'>
            {rooms.map((item) => (
              <ChatRoom key={item.id} room={item} />
            ))}
          </div>
        )}

        <div className='sidebar_cover  flex' ref={profileSidebarRef}>
          <div className='cover_top flex'>
            <Button
              bgColor='transparent'
              bSh=''
              transform='scale(1)'
              fs='1.5em'
              handleClick={closeProfileSidebar}
            >
              <IoMdArrowRoundBack style={{ pointerEvents: 'none' }} />
            </Button>

            <h2 className='cover_heading'>Profile</h2>
          </div>

          <div className='dp' onClick={openChangeDpDialog}>
            <img
              src={info && info.dp.url === '' ? dummyDp : info.dp.url}
              alt='dp'
            />
          </div>

          <div className='details flex'>
            <div className='row' style={{ marginTop: '20px' }}>
              <UpdateFormField
                wannaEdit={true}
                heading='Full name'
                htmlFor='fullName'
                inputName='fullName'
                type='text'
                handleInput={handleInput}
                refObj={fullNameValidationMT}
                inputValue={credentials.fullName}
              />
            </div>

            <div className='row'>
              <UpdateFormField
                wannaEdit={true}
                heading='User name'
                htmlFor='userName'
                inputName='userName'
                type='text'
                handleInput={handleInput}
                refObj={userNameValidationMT}
                inputValue={credentials.userName}
              />
            </div>

            <div className='row'>
              <div className='flex' style={{ justifyContent: 'space-between' }}>
                <label htmlFor='about'>About</label>
                <p className='message' ref={aboutValidationMT} />
              </div>

              <textarea
                name='about'
                id='about'
                rows='7'
                value={credentials.about}
                onChange={handleInput}
              />
            </div>
          </div>

          <Button
            type='button'
            width='92%'
            margin='5px 0px'
            padding='10px 0'
            transform='scale(1)'
            bgColor='#1a1919'
            handleClick={handleUpdate}
          >
            Update
          </Button>

          <Button
            type='button'
            width='92%'
            margin='1px 0px'
            padding='10px 0'
            transform='scale(1)'
            bgColor='#1a1919'
            handleClick={cancelUpdate}
          >
            Cancel
          </Button>
        </div>
      </Wrapper>
    </>
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
    background: #323739;

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

    .dp:hover {
      cursor: pointer;
    }

    .user_name {
      margin-left: 10px;
    }
  }

  .chat_rooms {
    margin-top: 20px;
  }

  .sidebar_cover {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #333;
    transform: translateX(-100%);
    opacity: 0;
    transition: transform 0.5s ease, opacity 0.4s ease;
    flex-direction: column;
    justify-content: flex-start;

    .cover_top {
      height: 15vh;
      justify-content: flex-start;
      align-items: flex-end;
      padding: 10px;
      background: #323739;
      width: 100%;

      .cover_heading {
        font-size: 1.2em;
        font-weight: 400;
        padding: 0 0 6px 20px;
      }
    }

    .dp {
      margin-top: 15px;
      width: 170px;
      height: 170px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }

      :hover {
        cursor: pointer;
      }
    }

    .dp:hover::after {
      content: 'Change profile photo';
      background-color: #333;
      color: #f3f0f0;
      font-size: 0.8em;
      padding: 4px 5px;
      border-radius: 5px;
      position: absolute;
      top: 50px;
      right: 00px;
    }

    .details {
      flex-direction: column;
      width: 100%;
      overflow-y: scroll;

      .row {
        padding: 0px 12px;
        width: 100%;

        textarea {
          width: 100%;
          font-size: 0.9em;
          padding: 5px;
        }
      }
    }
  }

  .sidebar_cover.show {
    transform: translateX(0%);
    opacity: 1;
  }
`;

const ChangeDpDialog = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.65);
  display: grid;
  place-content: center;
  z-index: 15;

  .center_box {
    width: 29vw;
    height: auto;
    background-color: #494949;
    border-radius: 12px;
    flex-direction: column;
    justify-content: flex-start;
    color: #ffffff;
    font-size: 0.95em;
  }

  .heading {
    width: 100%;
    font-size: 1.2em;
    padding: 22px 0;
    border-bottom: 1px solid #ffffff;
    text-align: center;
  }

  .btn {
    border-bottom: 1px solid #cac9c9;
    width: 100%;
    text-align: center;

    .upload_label_btn {
      display: inline-block;
      padding: 15px 0;
      width: 100%;
      font-size: 0.9em;
      font-weight: 700;
      color: #ffffff;
    }

    .upload_label_btn:hover {
      cursor: pointer;
    }
  }

  .cancel {
    border-bottom: none;
  }
`;

const CreateRoomDialog = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.65);
  display: grid;
  place-content: center;
  z-index: 15;

  .center_box {
    width: 29vw;
    height: auto;
    background-color: #494949;
    border-radius: 5px;
    flex-direction: column;
    justify-content: flex-start;
    color: #ffffff;
    font-size: 0.95em;
    position: relative;

    .loading {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      background: rgba(177, 177, 177, 0.8);
      display: grid;
      place-items: center;
      color: #222;
      font-size: 1.2em;
    }
  }

  form {
    flex-direction: column;
    padding: 30px 0;
    width: 55%;

    .preview {
      width: 150px;
      height: 150px;
      display: block;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .room_image {
      .text {
        display: inline-block;
        font-size: 0.9em;
        padding: 0px 0 8px;
      }
    }

    .room_name {
      font-size: 1.1em;
      font-weight: 400;
      padding: 8px 0;
      width: 100%;
      margin-top: 4px;
    }

    input {
      font-size: 1em;
      padding: 4px 5px;
      border-radius: 5px;
      width: 100%;
    }

    .message {
      width: 100%;
    }
  }

  .heading {
    width: 100%;
    font-size: 1.2em;
    padding: 22px 0;
    border-bottom: 1px solid #ffffff;
    text-align: center;
  }

  .cancel {
    border-bottom: none;
  }
`;

export default Sidebar;
