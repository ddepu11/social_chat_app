import { BrowserRouter as Router, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import LogIn from '../../screens/LogIn/LogIn';
import SignUp from '../../screens/SignUp/SignUp';
import ProtectedRoute from '../ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import useAppLogic from './Logic/useAppLogic';
import Home from '../../screens/Home/Home';
import Loader from '../Loader';

const App = () => {
  const { hasUserLoggedIn, userLoading } = useAppLogic();

  if (userLoading) {
    return <Loader />;
  }

  return (
    <Wrapper className='w-1050'>
      <ToastContainer />

      <Router>
        <Switch>
          <ProtectedRoute
            component={Home}
            path='/'
            isAuthenticated={hasUserLoggedIn}
            redirectedTo='/login'
          />

          <ProtectedRoute
            component={LogIn}
            path='/login'
            isAuthenticated={!hasUserLoggedIn}
            redirectedTo='/'
          />

          <ProtectedRoute
            component={SignUp}
            path='/signup'
            isAuthenticated={!hasUserLoggedIn}
            redirectedTo='/'
          />
        </Switch>
      </Router>
    </Wrapper>
  );
};

const Wrapper = styled.main``;

export default App;
