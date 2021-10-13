import styled from 'styled-components';

const Sidebar = () => {
  console.log('Sidebar');

  return (
    <Wrapper>
      <h2>Sidebar</h2>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  width: 30%;
  height: 100%;
  border: 1px solid #ffd102ef;
`;

export default Sidebar;
