import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`;
const Li = styled.li`
list-style-type: none;
font-family: sans-serif;
`;
const Number = styled.button`
width: 50px;
height: 50px;
border-radius: 50px;
border: none;
margin: 10px 10px;

&.active, &:hover {
    background: #fece35;
}
`;

export default function Pagination({ bookingsPerPage, totalBookings, currentPage, paginate }) {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalBookings/ bookingsPerPage); i++) {
        pageNumber.push(i)
    }
    return (
        <PaginationContainer>
            {pageNumber.map(number => (
                <Li key={number}>
                    <Number onClick={() => paginate(number)} className={currentPage === number ? 'active' : null}>
                        {number}
                    </Number>
                </Li>
            ))}
        </PaginationContainer>
    )
}