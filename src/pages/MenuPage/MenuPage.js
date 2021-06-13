import { React, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import menuimg from '../../imgs/menu.jpg';
import { getProducts } from '../../WebAPIs';
import { device } from '../../constants/devices';
import Pagination from '../../components/Pagination';

const Root = styled.div`
    width: 100%;
    background: url(${menuimg}) center/cover;
    padding: 200px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const changeColour = keyframes`
    from {
        color: #fece35;
    }

    to {
        color: #a3dea2;
    }
`;

const Loading = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1;

    h1 {
        font-size: 40px;
        font-weight: 900;
        margin: 200px auto;
        align-items: center;
        animation: ${changeColour} 5s infinite;
    };
    
    @media ${device.mobileXS} {
        top: -70px;
        height: 2400px;
    };
    @media ${device.mobileM} {
        top: -70px;
        height: 1800px;
    };
    @media ${device.tablet} {
        top: -70px;
        height: 1050px;
    };
    @media ${device.laptop} {
        top: -70px;
        height: 700px;
    };
`;

const ProductOptions = styled.section`
    width: 80%;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Product = styled.div`
    width: 200px;
    height: 60px;
    background: #fece35;
    margin: 10px 10px;
    border-radius: 8px;
    text-align: center;
    line-height: 4;
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
`;
const ProductContainer = styled.section`
    width: 350px;
    height: 450px;
    background: rgba(255, 255, 255, 0.7);
    margin: 20px 10px;
    border-radius: 5px;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ProductImg = styled.img`
    width: 90%;
    height: 200px;
    background: url(${(props) => props.$img}) no-repeat center/cover;;
`;

const ProductName = styled.h4`
    margin-top: 8px;
`;

const ProductDesc = styled.p`
    height: 100px;
    text-align: center;
    overflow: auto;

    @media ${device.mobileXS} {
        width: 240px;
    };
    @media ${device.mobileS} {
        width: 300px;
    };
`;

const ProductPrice = styled.h6``;

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
                <Product onClick={() => setFilter('Appetiser')}>Appetiser</Product>
                <Product onClick={() => setFilter('Main')}>Main course</Product>
                <Product onClick={() => setFilter('Dessert')}>Dessert</Product>
                <Product onClick={() => setFilter('Beverage')}>Beverage</Product>
                <Product onClick={() => setFilter('Alchohol')}>Alchohol</Product>
            </ProductOptions>

            <Products onClick={()=> alert('here is alert')}>
                {currentBookings && currentBookings.map( product =>
                <ProductContainer key={product.id}>
                    <ProductImg $img={product.url} />
                    <ProductName>{product.product}</ProductName>
                    <ProductDesc>{product.description}</ProductDesc>
                    <ProductPrice>${product.price}</ProductPrice>
                </ProductContainer>)}
            </Products>
            <Pagination bookingsPerPage={bookingsPerPage} totalBookings={initProducts.length} currentPage={currentPage} paginate={paginate}/>
            {isLoading && <Loading><h1>Loading ...</h1></Loading>}
        </Root>
    )
}