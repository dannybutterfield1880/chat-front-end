import styled from 'styled-components'

const PaddedSection = styled.section`
    padding: 1em;
`
export default ({ children, padding = '1em', style = false }) => {
    return <PaddedSection style={style?style:{}}>{ children }</PaddedSection>
}