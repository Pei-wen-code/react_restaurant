import { React, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../constants/devices'; 
import { register, getMe } from '../../WebAPIs';
import { isEmailValid, isPwValid, setAuthToken }from '../../utils';
import { AuthContext } from '../../context';
import Loader from '../../components/Loader';

const Root = styled.div`
    width: 100%;
    min-height: 100vh;
    background: #fefff8;
    padding: 200px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UserInfoContainer = styled.main`
    width: 80%;
    display: flex;
    justify-content: center;
`;

const UserInfoForm = styled.form`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputContainer = styled.section`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const InputLabel = styled.label`
    width: 80px;
    margin: 20px 20px;
`;

const Input = styled.input`
    height: 38px;
    margin: 10px 10px;
    border-radius: 5px;

    @media ${device.tablet} {
        width: 280px;
    };
`;

const Notice = styled.div``;

const ButtonsContainer = styled.section``;

const RegisterButton = styled.button`
    background: #fece35;
    margin: 10px auto;
    border-radius: 8px;
    border: none;
    padding: 20px 20px;

    @media ${device.mobileXS} {
        width: 200px;
    };
    @media ${device.tablet} {
        width: 400px;
    };

    &:hover {
        font-weight: bold;
        color: #fefff8;
    }
`;

const ErrorMessage = styled.div`
    text-align: center;
    color: red;
`;

export default function RegisterPage() {
    const { setUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const history = useHistory();

    const handleInputFocus = () => {
        setErrorMessage('');
    };
    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        if (isSubmit || errorMessage) return;
        if (!isEmailValid(email)) return setErrorMessage('Invalid email.');
        if (username[0] === ' ' || password[0] === ' ') return setErrorMessage('Please do not type space.');
        if (!username || !password) return setErrorMessage('You must fill in all fields.');
        if (!isPwValid(password)) return setErrorMessage('Password must be at least 8 characters long.');
        if (password !== confirmPassword) return setErrorMessage('Password confirmation went wrong. Please try again.');

        setIsSubmit(true);
        register(username, email, password)
        .then((response) => {
            if (response.ok !== 1 && response.message === 'ER_DUP_ENTRY') {
                setIsSubmit(false);
                return setErrorMessage('The username has already existed, please choose another one.');
            };
            setAuthToken(response.token);
            getMe().then((response) => {
                if(response.ok !== 1) {
                    setAuthToken('');
                    setIsSubmit(false);
                    return setErrorMessage(response.message);
                }
                setUser(response.authData.data);
                setIsSubmit(false);
                history.push('/');
            }).catch((err) => {
                setIsSubmit(false);
                return setErrorMessage(err.message);
            });
        }).catch((err) => {
            setIsSubmit(false);
            return setErrorMessage(err.message);
        });
    };

    return (
        <Root>
            <UserInfoContainer>
                <UserInfoForm onSubmit={handleSubmitForm}>
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <InputContainer>
                        <InputLabel>Username</InputLabel>
                        <Input value={username} onChange={e => setUsername(e.target.value)} onFocus={handleInputFocus}  />
                    </InputContainer>
                    <InputContainer>
                        <InputLabel>Email</InputLabel>
                        <Input value={email} onChange={e => setEmail(e.target.value)} onFocus={handleInputFocus}  />
                    </InputContainer>
                    <InputContainer>
                        <InputLabel>Password</InputLabel>
                        <Input type="password" value={password} onChange={e => setPassword(e.target.value)} onFocus={handleInputFocus}  />
                    </InputContainer>
                    <InputContainer>
                        <InputLabel>Confirm password</InputLabel>
                        <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} onFocus={handleInputFocus}  />
                    </InputContainer>
                    <Notice>*Password must be at least 8 characters long.</Notice>
                    <ButtonsContainer>
                        <RegisterButton type="submit">Register</RegisterButton>
                    </ButtonsContainer>
                </UserInfoForm>
            </UserInfoContainer>
            {isSubmit && <Loader isLoad={isSubmit}/>}
        </Root>
    )
}