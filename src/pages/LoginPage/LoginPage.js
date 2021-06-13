import { React, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { setAuthToken } from '../../utils';
import { device } from '../../constants/devices';
import { login, getMe } from '../../WebAPIs';
import { AuthContext } from '../../context';

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
    background: #fefff8;
    padding: 100px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    @media ${device.mobileL} {
        height: 700px;
    };
    @media ${device.tablet} {
        height: 740px;
    };
    @media ${device.laptop} {
        height: 1090px;
    };
    @media ${device.desktop} {
        height: 1600px;
    };
`;

const changeColour = keyframes`
    from {
        color: #fece35;
    }

    to {
        color: #a3dea2;
    }
`;
// Preload 的文字要改置中
const Loading = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1;

    h1 {
        font-size: 40px;
        font-weight: 900;
        margin: 130px auto;
        align-items: center;
        animation: ${changeColour} 5s infinite;
    };

    @media ${device.mobileXS} {
        top: -180px;
        height: 1220px;
    };
    @media ${device.mobileM} {
        top: -180px;
        height: 1166px;
    };
    @media ${device.mobileL} {
        top: -180px;
        height: 1150px;
    };
    @media ${device.laptop} {
        top: -70px;
        height: 1390px;
    };
    @media ${device.desktop} {
        top: -70px;
        height: 1904px;
    };
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
    margin: 10px 10px;
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
        if (isSubmit || errorMessage) return;
        if (!username || !password) return setErrorMessage('You must fill in all blanks')
        e.preventDefault();
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
            {isSubmit && <Loading><h1>Logining...</h1></Loading>}
        </Root>
    )
}