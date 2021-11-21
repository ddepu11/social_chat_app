import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useLogInLogic from './Logic/useLogInLogic';
import Loader from '../../components/Loader';
import FormControl from '../../components/FormControl';
import Button from '../../components/Button';

const LogIn = () => {
  const {
    handleSubmit,
    handleInput,
    userCredentials,
    emailValidationMessageTag,
    passwordValidationMessageTag,
    userLoading,
    loginAsRandomUser,
  } = useLogInLogic();

  if (userLoading) {
    return <Loader />;
  }

  return (
    <Wrapper className='w-960 flex'>
      <div className='hero'>
        <h1 className='heading'>Log in to Social Chat Rooms</h1>

        <form className='flex' onSubmit={handleSubmit}>
          <div className='row'>
            <FormControl
              fcWidth='100%'
              fcPadding='5px'
              label='Email'
              placeholder='enter your email'
              name='email'
              id='email'
              inputType='text'
              labelFs='1em'
              inputFs='0.85em'
              inputPadding='8px 10px'
              inputColor='#333'
              inputValue={userCredentials.email}
              handleInput={handleInput}
              refObj={emailValidationMessageTag}
              messageFs='0.8em'
            />
          </div>

          <div className='row'>
            <FormControl
              fcWidth='100%'
              fcPadding='5px'
              label='Password'
              placeholder='enter your password'
              name='password'
              id='password'
              inputType='password'
              labelFs='1em'
              inputFs='0.85em'
              inputPadding='8px 10px'
              inputColor='#333'
              inputValue={userCredentials.password}
              handleInput={handleInput}
              refObj={passwordValidationMessageTag}
              messageFs='0.8em'
            />
          </div>

          <Button
            type='submit'
            padding='5px 10px'
            borderRadius='5px'
            fs='0.8em'
            width='57%'
            margin='20px 0 0'
            bgColor='#266faa'
            transform='scale(1.02)'
          >
            Log In
          </Button>

          <div className='or_line flex'>
            <div className='left_line' />
            <span>OR</span>
            <div className='right_line' />
          </div>

          <Button
            type='button'
            padding='5px 10px'
            borderRadius='5px'
            fs='1em'
            width='57%'
            margin='20px 0 0'
            transform='scale(1.03)'
            bSh='rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'
            handleClick={loginAsRandomUser}
            bgColor='#4e4e4e'
          >
            <div className='center flex'>
              {/* <SupervisedUserCircleOutlinedIcon className='ic_twitter' /> */}
              <span>Log in as random user</span>
            </div>
          </Button>
        </form>
      </div>

      <div className='bottom flex'>
        <p>Don&apos;t have an account?</p>

        <Link to='/signup'>
          <Button
            type='submit'
            padding='5px 10px'
            borderRadius='5px'
            margin='0px 0 0'
            bgColor='transparent'
            bSh=''
            color='#147cd1'
            fs='0.9em'
            transform=''
          >
            <span style={{ fontWeight: 700 }}>Sign Up</span>
          </Button>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 50px 0;
  flex-direction: column;

  .heading {
    text-align: center;
    letter-spacing: 3px;
    color: #ffffff;
    font-size: 1.15em;
    font-weight: 400;
  }

  .heading:hover {
    cursor: default;
  }

  .hero {
    padding: 20px 00px 30px;
    width: 40%;
    flex-direction: column;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    form {
      margin-top: 40px;
      flex-direction: column;
    }

    .row {
      width: 60%;
      margin-bottom: 12px;
    }

    .or_line {
      margin-top: 20px;
      width: 57%;
      justify-content: space-between;

      .left_line {
        height: 2px;
        width: 40%;
        background-color: #ffffff;
      }

      span {
        color: #ffffff;
      }

      .right_line {
        height: 2px;
        width: 40%;
        background-color: #ffffff;
      }

      :hover {
        cursor: default;
      }
    }

    .center {
      .ic_twitter {
        color: #ffffff;
      }

      span {
        color: #ffffff;
        margin-left: 10px;
      }
    }
  }

  .bottom {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    width: 40%;
    padding: 10px 0;
    margin-top: 15px;

    p {
      font-size: 0.9em;
    }

    p:hover {
      cursor: default;
    }
  }
`;

export default LogIn;
