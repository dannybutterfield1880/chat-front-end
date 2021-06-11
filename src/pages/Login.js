import { get, post } from '../utils/axios';
import { useContext } from 'react';
import AuthContext from '../contexts/authContext';
import styled from 'styled-components'
import Button from '../components/Button'
import { useHistory } from 'react-router';
import useInput from '../effects/useInput';
import { colors } from '../components/style-constants';
import { Paper } from '@material-ui/core'
import FormPaper from '../components/FormPaper';
import Padding from '../components/Padding';
import ButtonRow from '../components/ButtonRow';
import ScrollToTop from '../components/ScrollToTop';

const Login = () => {
    const auth = useContext(AuthContext)
    const [username, usernameInput] = useInput({ type: 'text', placeholder: 'username', inputMargin: '0.5em 0' })
    const [password, passwordInput] = useInput({ type: 'password', placeholder: 'password', inputMargin: '0.5em 0 0 0' })
    const history = useHistory();
    const { setToken, setUser, loadContacts } = auth;
    
    const loginRequest = async () => {
        //get users token
        const { token } = await post('/login', { username })
        setToken(token);

        //load user and add to context
        const userResponse = await get('/user', token);
        setUser(userResponse);

        loadContacts(token);

        history.push('/')
    }
    
    return (
        <Padding>
            <ScrollToTop />
            <FormPaper>
                <Padding>
                    <h2>Login</h2>
                    {usernameInput}
                    {passwordInput}
                    <ButtonRow>
                        <Button variant='contained' color="primary" onClick={() => loginRequest()}>Login</Button>
                        <Button variant='text' onClick={() => history.push('/register')}>Register</Button>
                    </ButtonRow>
                </Padding>
            </FormPaper>
        </Padding>
    )
}

export default Login;