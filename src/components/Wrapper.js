import styled from 'styled-components';

const StyledWrapper = styled.section`
  min-height: 100vh;
  margin-top: 3.3em;
`;

const Wrapper = ({ children }) => (
    <StyledWrapper>
        {children}
    </StyledWrapper>
)

export default Wrapper;