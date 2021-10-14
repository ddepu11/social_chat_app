import styled from 'styled-components';

const Hero = () => {
  console.log('Hero');

  return (
    <Wrapper>
      <h2>Hero</h2>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 5px 5px;
  border: 1px dashed #00ff55da;
  width: 70%;
  height: 100%;
`;

export default Hero;
