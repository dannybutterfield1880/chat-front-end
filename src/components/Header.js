import styled from 'styled-components';
import { Fragment } from 'react';
import { colors } from './style-constants';

const StyledHeader = styled.header`
  display: flex;
  flex: 1;
  justify-content: center;
  position: fixed;
  width: 100%;
  z-index: 1;
  background: ${colors.black};
`;

const Header = ({ children }) => {

  return (
    <Fragment>
      <StyledHeader>
        {children}
      </StyledHeader>
    </Fragment>
    
  )
    
}

export default Header;