import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Hero from './Hero/Hero';
import Sidebar from './Sidebar/Sidebar';

const Home = () => (
  <Wrapper className='flex'>
    <Sidebar />

    <Route path='/room/:roomId'>
      <Hero />
    </Route>
  </Wrapper>
);

const Wrapper = styled.main`
  margin-top: 40px;
  height: 90vh;
`;

export default Home;
