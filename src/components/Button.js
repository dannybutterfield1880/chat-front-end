import styled from 'styled-components'
import { colors } from './style-constants';
import Button from '@material-ui/core/Button';

export default function MyButton(props) {
  
  return (
      <Button {...props} />
  )
}

const FixedStyledButton = styled(Button)`
    position: fixed !important;
    bottom: 0;
    width: 100%;
    border-radius: 0 !important;
    padding: 1em !important;
  `

export const FixedButton = ({ onClick, position, children, color = colors.primary }) => {

  return (
    <FixedStyledButton variant="contained" color="primary" onClick={() => onClick()}>{children}</FixedStyledButton>
  )
}