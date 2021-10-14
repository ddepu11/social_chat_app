import styled from 'styled-components';
import Hero from './Hero/Hero';
import Sidebar from './Sidebar/Sidebar';

const Home = () => {
  console.log('Home');

  return (
    <Wrapper className='flex'>
      <Sidebar />

      <Hero />
    </Wrapper>
  );
};
const Wrapper = styled.main`
  margin-top: 40px;
  height: 90vh;
`;

export default Home;
