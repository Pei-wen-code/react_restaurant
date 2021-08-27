import React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import { device } from '../../constants/devices';

const Overlay = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right:0;
    bottom: 0;
    background: rgba(0,0,0,0.4);
    z-index: 2;
`;

const PopContainer = styled.div`
    @media ${device.mobileXS} {
        width: 90%;
        background: #fefff8;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 8px;
        padding: 40px;
    };

    @media ${device.laptopL} {
        width: 50%;
        padding: 100px;
    };
`;

const Message = styled.h6`
    text-align: center;
    margin-bottom: 50px;
`;

const ButtonsContainer = styled.div`
    @media ${device.mobileXS} {
        width: 100%;
        display: flex;
        flex-direction: column;
    };
    @media ${device.laptopL} {
        flex-direction: row;
        justify-content: space-around;
    };
`;

const Button = styled.button`
    @media ${device.mobileXS} {
        width: 100%;
        background: #fece35;
        margin-top: 20px;
        border: none;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.11);
        padding: 30px;

        &:hover {
            color: #fefff8;
            font-weight: bold;
        };
    };

    @media ${device.laptopL} {
        width: 45%;
    };
`;

const ErrorMessage = styled.div`
    text-align: center;
    color: red;
    margin-bottom: 20px;
`;

export default function Modal({ open, close, children, submit, errorMessage }) {
    if (!open) return null;

    return ReactDom.createPortal(
        <>
            <Overlay>
                <PopContainer>
                    <Message>{children}</Message>
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <ButtonsContainer>
                        <Button onClick={close}>No, I'll think about it.</Button>
                        <Button onClick={submit}>Yes, reserve a table for me.</Button>
                    </ButtonsContainer>
                </PopContainer>
            </Overlay>
        </>,
        document.getElementById('portal')
    );
};