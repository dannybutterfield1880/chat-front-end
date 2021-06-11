import { useHistory } from "react-router";
import styled from 'styled-components';

const FABWrapper = styled.div`
    position: fixed;
    bottom:10px;
    right:10px;
`

const FABButton = styled.button`
    cursor: pointer;
    width: 48px;
    height: 48px;
    border-radius: 30px;
    background-color: #cb60b3;
    border: none;
    box-shadow: 0 1px 5px rgba(0,0,0,.4);
    font-size: 24px;
    color: white;
    
    -webkit-transition: .2s ease-out;
    -moz-transition: .2s ease-out;
    transition: .2s ease-out;

`

const FABButtonMain = styled(FABButton)`
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: #5b19b7;
    right: 0;
    bottom: 0;
    z-index: 20;
    &:before {
        content: '⏚';
    }
    &:active, &:focus {
        outline: none;
        background-color: #7716ff;
        box-shadow: 0 3px 8px rgba(0,0,0,.5);
    }
    &:active:before, &:focus:before {
        content: '↑';
    }
    &:active + ul, &:focus + ul {
        bottom: 70px;
    }
    &:active + ul li, &:focus + ul li {
        margin-bottom: 10px;
        opacity: 1;
    }
    &:active + ul li:hover label, :focus + ul li:hover label {
        opacity: 1;
    }
`
const FABList = styled.ul`
    position:absolute;
    bottom: 0;
    right: 0;
    padding:0;
    padding-right:5px;
    margin:0;
    list-style:none;
    z-index:10;
    
    -webkit-transition: .2s ease-out;
    -moz-transition: .2s ease-out;
    transition: .2s ease-out;
`
const FABItem = styled.li`
    display: flex;
    justify-content: flex-start;
    position: relative;
    margin-bottom: -10%;
    opacity: 0;
    color: black;

    -webkit-transition: .3s ease-out;
    -moz-transition: .3s ease-out;
    transition: .3s ease-out;
`

const FABLabel = styled.label`
    margin-right:10px;
    white-space: nowrap;
    display: block;
    margin-top: 10px;
    padding: 5px 8px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,.2);
    border-radius:3px;
    height: 18px;
    font-size: 16px;
    pointer-events: none;
    opacity:0;
    
    -webkit-transition: .2s ease-out;
    -moz-transition: .2s ease-out;
    transition: .2s ease-out;
  `

const FAB = () => {
    const history = useHistory();

    return (
        <FABWrapper>
            <FABButtonMain />
            <FABList>
                <FABItem>
                    <FABLabel>Contacts</FABLabel>
                    <FABButton onClick={() => console.log('clicked')}>c</FABButton>
                </FABItem>
            </FABList>
            {/* <ul>
                <li>
                <label for="opcao1">Opção 1</label>
                <button id="opcao1">
                ⎈
                </button>
                </li>
                <li>
                <label for="opcao2">Opção 2</label>
                <button id="opcao2">
                ⎗
                </button>
                </li>
                <li>
                <label for="opcao3">Opção 3</label>
                <button id="opcao3">
                ☏
                </button>
                </li>
            </ul> */}
        </FABWrapper>

    )
}

export default FAB;