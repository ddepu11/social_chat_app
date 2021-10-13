import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import LogIn from '../../screens/LogIn/LogIn';
import SignUp from '../../screens/SignUp/SignUp';
import ProtectedRoute from '../ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import useAppLogic from './Logic/useAppLogic';

const App = () => {
  const { hasUserLoggedIn } = useAppLogic();

  return (
    <Wrapper>
      <ToastContainer />

      <Router>
        <Link to='/login'>Login</Link>

        <Link to='/signup'>Signup</Link>

        <Switch>
          {/* <Route path='/login' exact>
            <LogIn />
          </Route> */}

          <ProtectedRoute
            component={LogIn}
            path='/login'
            isAuthenticated={!hasUserLoggedIn}
            redirectedTo='/'
          />

          {/* 
          <Route path='/signup' exact>
            <SignUp />
          </Route> */}

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
