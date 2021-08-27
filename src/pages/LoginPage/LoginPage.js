import { React, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled, { css  } from 'styled-components';
import { setAuthToken } from '../../utils';
import { device } from '../../constants/devices';
import { login, getMe } from '../../WebAPIs';
import { AuthContext } from '../../context';
import Loader from '../../components/Loader';

const reuseHover = css`
    font-weight: bold;
    color: #fefff8;
`;

const reuseButton = css`
    margin: 10px 10px;
    border-radius: 8px;
    padding: 20px 20px;
    text-align: center;
    color: black;
`;

const Root = styled.div`
    width: 100%;
    min-height: 100vh;
    background: #fefff8;
    padding: 200px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UserInfoContainer = styled.div`
    width: 80%;
    border-radius: 8px;
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

const ButtonsContainer = styled.section`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
`;

const LoginButton = styled.button`
    background: #fece35;
    border: none;
    ${reuseButton};

    @media ${device.mobileXS} {
        width: 200px;
    };
    @media ${device.tablet} {
        width: 400px;
    };
    
    &:hover {
        ${reuseHover}
    }
`;

const RegisterButton = styled(Link)`
    background: #a3dea2;
    text-decoration: none;
    ${reuseButton};

    @media ${device.mobileXS} {
        width: 200px;
    };
    @media ${device.tablet} {
        width: 400px;
    };

    &:hover {
        text-decoration: none;
        ${reuseHover}
    }
`;

const ErrorMessage = styled.div`
    text-align: center;
    color: red;
`;

export default function LoginPage() {
    const { setUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const history = useHistory();

    const handleInputFocus = () => {
        setErrorMessage('');
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (isSubmit || errorMessage) return;
        if (!username || !password) return setErrorMessage('You must fill in all blanks')
        
        setIsSubmit(true);
        login(username, password)
        .then((response) => {
            if(response.ok !== 1) {
                setIsSubmit(false);
                return setErrorMessage(response.message);
            }
            setAuthToken(response.token);
            getMe()
            .then((response) => {
                if (response.ok !== 1) {
                    setAuthToken('');
                    setIsSubmit(false);
                    return setErrorMessage(response.message);
                }
                setUser(response.authData.data);
                setIsSubmit(false);
                history.push('/');
            }).catch((err) => {
                setIsSubmit(false);
                return setErrorMessage(errorMessage);
            });
        })
        .catch((err) => {
            setIsSubmit(false);
            return setErrorMessage(`${err.message}! Sorry, the server is done.`);
        });
    }

    return (
        <Root>
            <UserInfoContainer>
                <UserInfoForm onSubmit={handleSubmitForm}>
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <InputContainer>
                        <InputLabel>Username</InputLabel>
                        <Input value={username} onChange={handleUsernameChange} onFocus={handleInputFocus} />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel>Password</InputLabel>
                        <Input type="password" value={password} onChange={handlePasswordChange} onFocus={handleInputFocus} />
                    </InputContainer>
                    <ButtonsContainer>
                        <LoginButton type="submit">Login</LoginButton>
                        <RegisterButton to='register'>Don't have an account? Register now!</RegisterButton>
                    </ButtonsContainer>
                </UserInfoForm>
            </UserInfoContainer>
            {isSubmit && <Loader isLoad={isSubmit}/>}
        </Root>
    )
}