import { useState } from 'react';
import { useSelector } from 'react-redux';

const useHeroLogic = () => {
  const { info, hasUserLoggedIn } = useSelector((state) => state.user.value);
  const [message, setMessage] = useState('');

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(message);
  };

  return { info, hasUserLoggedIn, message, handleMessage, handleSendMessage };
};

export default useHeroLogic;
