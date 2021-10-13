import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useSignUpLogic from './Logic/useSignUpLogic';
import Loader from '../../components/Loader';
import FormControl from '../../components/FormControl';
import Button from '../../components/Button';

const SignUp = () => {
  const {
    handleInput,
    handleSubmit,
    userCredentials,
    validationMessageTags,
    userLoading,
  } = useSignUpLogic();

  if (userLoading) {
    return <Loader />;
  }

  return (
    <Wrapper className='w-960 flex'>
      <div className='hero'>
        <h1 className='heading'>Sign up to Social Chat App</h1>

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
              refObj={validationMessageTags.emailValidationMessageTag}
              messageFs='0.8em'
            />
          </div>

          <div className='row'>
            <FormControl
              fcWidth='100%'
              fcPadding='5px'
              label='Full Name'
              placeholder='enter your full name'
              name='fullName'
              id='fullName'
              inputType='text'
              labelFs='1em'
              inputFs='0.85em'
              inputPadding='8px 10px'
              inputColor='#333'
              inputValue={userCredentials.fullName}
              handleInput={handleInput}
              refObj={validationMessageTags.fullNameValidationMessageTag}
              messageFs='0.8em'
            />
          </div>

          <div className='row'>
            <FormControl
              fcWidth='100%'
              fcPadding='5px'
              label='Username'
              placeholder='enter your username'
              name='userName'
              id='username'
              inputType='username'
              labelFs='1em'
              inputFs='0.85em'
              inputPadding='8px 10px'
              inputColor='#333'
              inputValue={userCredentials.userName}
              handleInput={handleInput}
              refObj={validationMessageTags.userNameValidationMessageTag}
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
              refObj={validationMessageTags.passwordValidationMessageTag}
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
            Sign Up
          </Button>
        </form>
      </div>

      <div className='bottom flex'>
        <p>Have an account?</p>

        <Link to='/login'>
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
            <span style={{ fontWeight: 700 }}>Log in</span>
          </Button>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 10px 0;
  flex-direction: column;

  .heading {
    text-align: center;
    font-size: 1.5em;
    letter-spacing: 3px;
    color: #ffffff;
  }

  .heading:hover {
    cursor: default;
  }

  .hero {
    padding: 10px 00px 30px;
    width: 40%;
    flex-direction: column;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    form {
      margin-top: 20px;
      flex-direction: column;
    }

    .row {
      width: 60%;
      margin-bottom: 10px;
    }

    .terms {
      text-align: center;
      font-size: 0.8em;
      color: #797979;
      max-width: 60%;
      margin: 0 auto;
      margin-top: 20px;
    }

    .terms:hover {
      cursor: default;
    }
  }

  .bottom {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    width: 40%;
    padding: 10px 0;
    margin-top: 10px;

    p {
      font-size: 0.9em;
    }

    p:hover {
      cursor: default;
    }
  }
`;

export default SignUp;
