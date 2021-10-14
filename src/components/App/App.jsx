import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import LogIn from '../../screens/LogIn/LogIn';
import SignUp from '../../screens/SignUp/SignUp';

import 'react-toastify/dist/ReactToastify.css';
import useAppLogic from './Logic/useAppLogic';
import Home from '../../screens/Home/Home';
import Loader from '../Loader';
import ProtectedRoute from '../ProtectedRoute';

const App = () => {
  const { userLoading, hasUserLoggedIn } = useAppLogic();

  if (userLoading) {
    return <Loader />;
  }

  return (
    <Wrapper className='w-1050'>
      <ToastContainer />

      <Router>
        <Switch>
          {/* <Route path='/' exact>
            <Home />
          </Route> */}

          <Route path='/login' exact>
            <LogIn />
          </Route>

          <Route path='/signup' exact>
            <SignUp />
          </Route>

          <ProtectedRoute
            component={Home}
            path='/'
            isAuthenticated={hasUserLoggedIn}
          />
        </Switch>
      </Router>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  overflow: hidden;
`;

export default App;
