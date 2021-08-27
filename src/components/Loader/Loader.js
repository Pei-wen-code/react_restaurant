import React from 'react';
import styled from 'styled-components';
import { SyncLoader } from 'react-spinners';

const Loading = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
`;

export default function Loader({ isLoad }) {
    return (
        <Loading>
            <SyncLoader color="#fefff8" loading={isLoad} />
        </Loading>
    )
};