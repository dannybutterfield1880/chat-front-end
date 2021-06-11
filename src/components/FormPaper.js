import styled from 'styled-components'
import { Paper } from '@material-ui/core'
const FormPaper = styled(Paper)`
        //padding: 0.5em 1em;
        border-radius: ${param => param ? '0 !important' : 'inherit'};
        & h1, h2, h3, h4, h5 {
            text-align: center;
        }
    `
export default ({ children, rounded = true, style }) => {
    return <FormPaper style={style}>{ children }</FormPaper>
}
