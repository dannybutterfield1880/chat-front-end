import styled from 'styled-components'

export default ({ children, margin = '1em' }) => {
    const MarginSection = styled.section`
        margin: ${margin};
    `
    return <MarginSection>{ children }</MarginSection>
}