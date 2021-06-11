import { post } from '../utils/axios';
import { useContext, useState } from 'react';
import AuthContext from '../contexts/authContext';
import Button from '../components/Button'
import { useHistory } from 'react-router';
import useInput from '../effects/useInput';
import FormPaper from '../components/FormPaper';
import Padding from '../components/Padding';
import ButtonRow from '../components/ButtonRow';
import ScrollToTop from '../components/ScrollToTop';

const Register = () => {
    const [test, setTest] = useState('');
    const auth = useContext(AuthContext)
    const [email, emailInput] = useInput({ type: 'text', placeholder: 'email', inputMargin: '0.5em 0' })
    const [username, usernameInput] = useInput({ type: 'text', placeholder: 'username', inputMargin: '0.5em 0' })
    const [password, passwordInput] = useInput({ type: 'password', placeholder: 'password', inputMargin: '0.5em 0' })
    const [confirmPassword, confirmPasswordInput] = useInput({ type: 'password', placeholder: 'confirm password', inputMargin: '0.5em 0' })
    const [dob, dobInput] = useInput({ type: 'date', placeholder: 'dob', inputMargin: '0.5em 0 0 0' })
    const history = useHistory();
    const { setToken } = auth;
    
    const registerRequest = async () => {
        const body = {
            email,
            username,
            password,
            confirmPassword,
            dob
        }
        const response = await post('/register', body)
    
        setToken(response.token);
        history.push('/')
    }

    return (
        <Padding>
            <ScrollToTop />
            <FormPaper>
                <Padding>
                    <h2>Register</h2>
                    { emailInput }
                    { usernameInput }
                    { passwordInput }
                    { confirmPasswordInput }
                    { dobInput }
                    <ButtonRow>
                        <Button variant="contained" color="primary" onClick={() => registerRequest()}>Register</Button>
                        <Button variant="text" onClick={() => history.goBack()}>Back</Button>
                    </ButtonRow>
                </Padding>
            </FormPaper>
        </Padding>
    )
}

export default Register;