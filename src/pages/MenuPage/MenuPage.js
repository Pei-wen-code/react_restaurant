import { React, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import menuimg from '../../imgs/menu.jpg';
import { getProducts } from '../../WebAPIs';
import { device } from '../../constants/devices';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';

const Root = styled.div`
    width: 100%;
    min-height: 100vh;
    background: url(${menuimg}) center/cover;
    padding: 200px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    &::after {
        content: '';
        background: rgba(0, 0, 0, 0.4);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    };
`;

const ProductOptions = styled.section`
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    z-index: 1;
`;

const ProductOption = styled.div`
    width: 200px;
    height: 60px;
    background: #fece35;
    margin: 10px 10px;
    border-radius: 8px;
    text-align: center;
    line-height: 3.5;
    font-weight: bold;
    color: #fefff8;
    cursor: pointer;
    transition: transform 0.5s;

    &:hover {
        transform: scale(1.1);
    };
`;

const Products = styled.div`
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    z-index: 1;
`;
const ProductContainer = styled.section`
    width: 330px;
    height: 480px;
    background: rgba(255, 255, 255, 0.7);
    margin: 20px 20px;
    border-radius: 5px;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const fadeIn = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

const Overlay = styled.div`
    width: 297px;
    height: 282px;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    z-Index: 1;

    &:hover {
        z-Index: 2;
        animation: 1s ${fadeIn} ease-out;
        animation-fill-mode: forwards;  
    };
`;

const ProductImg = styled.img`
    @media ${device.mobileXS} {
        width: 90%;
        height: 60%;
        object-fit: cover;
        position: relative;

        &:hover {
            z-Index: 2;
        };
    };
`;

const ProductName = styled.h4`
    margin-top: 8px;
    font-family: 'Permanent Marker', cursive;
`;

const ProductDesc = styled.p`
    height: 100px;
    text-align: center;
    overflow: auto;
    font-family: 'Permanent Marker', cursive;

    @media ${device.mobileXS} {
        width: 90%;
    };
`;

const ProductPrice = styled.h6`
    font-family: 'Permanent Marker', cursive;
`;

const ErrorMessage = styled.div`
    text-align: center;
    color: red;
`;

export default function MenuPage() {
    const [filter, setFilter] = useState('Main');
    const [initProducts, setInitProducts] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(9);

    useEffect(() => {
        setIsLoading(true);
        getProducts(filter)
        .then((data) => {
            if (data.ok !== 1) return setErrorMessage(data.message);
            setInitProducts(data.message);
            setIsLoading(false);
        })
        .catch((err) =>{
            setIsLoading(false);
            return setErrorMessage(err);
        });
    }, [filter]);

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = initProducts.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <Root>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <ProductOptions>
                <ProductOption onClick={() => setFilter('Appetiser')}>Appetiser</ProductOption>
                <ProductOption onClick={() => setFilter('Main')}>Main course</ProductOption>
                <ProductOption onClick={() => setFilter('Dessert')}>Dessert</ProductOption>
                <ProductOption onClick={() => setFilter('Beverage')}>Beverage</ProductOption>
                <ProductOption onClick={() => setFilter('Alchohol')}>Alchohol</ProductOption>
            </ProductOptions>

            <Products>
                {currentBookings && currentBookings.map( product =>
                <ProductContainer key={product.id}>
                    <Overlay></Overlay>
                    <ProductImg src={product.url} alt="picture"/>
                    <ProductName>{product.product}</ProductName>
                    <ProductDesc>{product.description}</ProductDesc>
                    <ProductPrice>${product.price}</ProductPrice>
                </ProductContainer>)}
            </Products>
            <Pagination bookingsPerPage={bookingsPerPage} totalBookings={initProducts.length} currentPage={currentPage} paginate={paginate}/>
            {isLoading && <Loader isLoad={isLoading}/>}
        </Root>
    )
}