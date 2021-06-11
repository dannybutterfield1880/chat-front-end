import styled from 'styled-components'

const Buttons = styled.div`
    display: flex;
    margin-top: 1em;
    
`

const ButtonColumn = styled(Buttons)`
    flex-direction: column;
    & > button {
        margin-bottom: 1em;
    }
`

const ButtonRow = styled(Buttons)`
    flex-direction: row;
    margin-bottom: 1em;
    & > button {
        flex: 1;
    }
    & > button:nth-child(1) {
        margin-right: 1em;
    }
`

export default ({ direction = 'column', children }) => {
    return (direction === 'column') 
        ? <ButtonColumn>{ children }</ButtonColumn> 
        : <ButtonRow>{ children }</ButtonRow>
}