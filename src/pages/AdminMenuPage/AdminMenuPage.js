import { React, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { device } from '../../constants/devices';
import { addProduct, getProducts, deleteProduct, updateItemFile, updateItemText } from '../../WebAPIs';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';

const reuseInputAttributes = css`
    margin: 10px 10px;
    border-color: black;
    border-radius: 5px;
`;

const reuseButton = css`
    width: 95%;
    height: 80px;;
    background: white;
    margin: 5px 5px;
    border: none;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.11);
    padding: 10px;
    display: felx;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s;

    &:hover {
        transform: scale(1.1);
    };
`;

const Root = styled.div`
    width: 100%;
    background: #fefff8;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 200px 0px;
`;

const AddProductContainer = styled.main`
    width: 80%;
    border-radius: 8px;
`;

const AddProductForm = styled.form`
    width: 100%;
    display: flex;
`;

const TextDetailContainer = styled.section`
    width:576px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.section`
    margin: 10px 0px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

const Input = styled.input`
    height: 38px;
    ${reuseInputAttributes};

    @media ${device.mobileXS} {
        width: 184px;
    };
    @media ${device.mobileS} {
        width: 240px;
    };
    @media ${device.mobileM} {
        width: 260px;
    };
    @media ${device.tablet} {
        width: 400px;
    };
    @media ${device.laptop} {
        width: 350px;
    };
`;

const InputLong = styled.textarea`
    border-width: 2px;
    ${reuseInputAttributes};

    @media ${device.mobileXS} {
        width: 184px;
        height: 360px;
    };
    @media ${device.mobileS} {
        width: 240px;
    };
    @media ${device.mobileM} {
        width: 260px;
        height: 300px;
    };
    @media ${device.tablet} {
        width: 400px;
    };
    @media ${device.laptop} {
        width: 350px;
    };
`;

const InputLabel = styled.label`
    width: 86px;
    margin: 10px 10px;

    @media ${device.mobileXS} {
        text-align: center;
    };
    @media ${device.tablet} {
        text-align: left;
    };
`;

const Option = styled.option``;

const Select = styled.select`
    height: 38px;
    ${reuseInputAttributes};
    border-width: 2px;

    @media ${device.mobileXS} {
        width: 184px;
    };
    @media ${device.mobileS} {
        width: 240px;
    };
    @media ${device.mobileM} {
        width: 260px;
    };
    @media ${device.tablet} {
        width: 400px;
    };
    @media ${device.laptop} {
        width: 350px;
    };
`;
const AddButton = styled.button`
    width: 100%;
    height: 80px;
    background: rgba(163, 222, 162, 0.5);
    margin: 20px auto;
    border: none;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.11);
    transition: transform 0.5s;

    &:hover {
        transform: scale(1.1);
    };
`;

const OptionContainer = styled.div`
    border-radius: 5px;
    display: flex;

    @media ${device.mobileXS} {
        flex-direction: column;
    };
    @media ${device.tablet} {
        flex-direction: row;
    };
`;

const ProductsOption = styled.div`
    border-bottom: 5px solid transparent;
    padding: 20px;
    font-weight: bold;
    color: #4b731f;
    cursor: pointer;

    &:hover {
        border-bottom: 5px solid rgba(247, 202, 24, 0.7);;
    };

    @media ${device.mobileXS} {
        font-size: 24px;
    };

    @media ${device.laptop} {
        font-size: 32px;
    };
`;

const ShowProductsContainer = styled.main`
    width: 80%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const ProductContainer = styled.div`
    width: 100%;
    background: rgba(247, 202, 24, 0.7);
    margin: 14px 0;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const ProductImageConatiner = styled.div`
    width: 300px;
    height: 300px;
`;

const ProductImage = styled.img`
    object-fit: cover;

    @media ${device.mobileXS} {
        width: 100%;
        height: 100%;
    };
`;

const ProductTextContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    
    @media ${device.mobileM} {
        width: 100%;
    };
    @media ${device.laptop} {
        width: 34%;
        height: 300px;
    };
    @media ${device.laptopL} {
        width: 50%;
    };
`;

const ProductInfo = styled.p`
    width: 94%;
    margin: 10px;
    text-align: center;
    
    @media ${device.laptop} {
        &:last-child {
            overflow: auto;
        };
    };
`;

const ButtonsContainer = styled.section`
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const EditButton = styled(HashLink)`
    ${reuseButton};
    color: black;

    &:hover {
        color: black;
        text-decoration: none;
    }
`;

const DeleteButton = styled.button`
    ${reuseButton};
`;

const ErrMessage = styled.h5`
    text-align: center;
    color: red;
`;

export default function AdminMenu() {
    const [initProducts, setInitProducts] = useState('');
    const [filter, setFilter] = useState('Main')
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('Appetiser');
    const [selectFile, setSelectFile] = useState(null);
    const [errMessage, setErrMessage] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(3);
    const { pathname } = useLocation();

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (!product || !price || !type || !desc || !selectFile) {
            return setErrMessage("Some inputs are left in blank, you must fill all.")
        };

        setIsSubmit(true);

        const formData = new FormData();
        formData.append('product', product);
        formData.append('price', price);
        formData.append('type', type);
        formData.append('desc', desc);
        formData.append('file', selectFile);

        addProduct(formData)
        .then(response => {
            if (response.ok !== 1) {
                setIsSubmit(false);
                return setErrMessage(response.message)
            };

            getProducts(type)
            .then((data) => {
                if (data.ok !== 1) return setErrMessage(data.message);
                setInitProducts(data.message);
                setProduct('');
                setPrice('');
                setDesc('');
                setType('Appetiser');
                setSelectFile(null);
                setIsSubmit(false);
                setEditMode(false);
            })
            .catch((err) => {
                setIsSubmit(false);
                setEditMode(false);
                return setErrMessage(err)
            });
        })
        .catch((err) => {
            setIsSubmit(false);
            setEditMode(false);
            return setErrMessage(err)
        });
    };

    const handleEditForm = (e) => {
        setIsSubmit(true);
        e.preventDefault();

        if (!selectFile) {
            updateItemText({product, price, type, desc, editId})
            .then((response) => {
                if (response.ok !== 1) {
                    return setErrMessage(response.message)
                }
                getProducts(type)
                .then((data) => {
                    if (data.ok !== 1) return setErrMessage(data.message);
                    setInitProducts(data.message);
                    setProduct('');
                    setPrice('');
                    setDesc('');
                    setType('Appetiser');
                    setEditId(null);
                    setIsSubmit(false);
                    setEditMode(false);
                })
                .catch((err) => {
                    setIsSubmit(false);
                    setEditMode(false);
                    return setErrMessage(err)
                });
            })
            .catch((err) => {
                setIsSubmit(false);
                setEditMode(false);
                return setErrMessage(err)
            });
        };

        if (selectFile) {
            setIsSubmit(true);

            const formData = new FormData();
            formData.append('product', product);
            formData.append('price', price);
            formData.append('type', type);
            formData.append('desc', desc);
            formData.append('file', selectFile);

            updateItemFile(formData, editId)
            .then(response => {
                if (response.ok !== 1) {
                    setErrMessage(response.message)
                };
                getProducts(type)
                .then((data) => {
                    if(data.ok !== 1) return setErrMessage(data.message);
                    setInitProducts(data.message);
                    setProduct('');
                    setPrice('');
                    setDesc('');
                    setType('Appetiser');
                    setSelectFile(null);
                    setEditId(null);
                    setIsSubmit(false);
                    setEditMode(false);
                })
                .catch((err) => {
                    setIsSubmit(false);
                    setEditMode(false);
                    return setErrMessage(err)
                });
            })
            .catch((err) => {
                setIsSubmit(false);
                setEditMode(false);
                return setErrMessage(err)
            });
        };
    };
    const handleGiveUpEdit = () => {
        setProduct('');
        setPrice('');
        setDesc('');
        setType('Appetiser');
        setSelectFile(null);
        setEditMode(false);
    }

    const handleClickDelete = (productId, productType) => {
        deleteProduct(productId)
        .then((response) => {
            if (response.ok !== 1) return setErrMessage(response.message);
            getProducts(productType)
            .then((data) => {
                if (data.ok !== 1) return setErrMessage(data.message);
                setInitProducts(data.message)
            })
            .catch((err) => {
                return setErrMessage(err)
            });
        })
        .catch((err) => {
            return setErrMessage(err)
        })
    };
    const addDataToEdit = (productInfo) => {
        const { id, product, price, type, description } = productInfo;
        setProduct(product);
        setPrice(price);
        setType(type);
        setDesc(description);
        setEditId(id);
        setEditMode(true);
    };
    const handleInputFocus = () => {
        setErrMessage('');
    };
    useEffect(() => {
        setIsLoading(true);
        getProducts(filter)
        .then((data) => {
            setInitProducts(data.message);
            setIsLoading(false);
        })
        .catch((err) => {
            setIsLoading(false);
            return setErrMessage(err)
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
            <AddProductContainer id="input">
                {!editMode ? <AddButton onClick={() => setEditMode(true)}>Add some good stuff!</AddButton> : ''}
                {errMessage && <ErrMessage>{errMessage}</ErrMessage>}
                {editMode && <AddProductForm onSubmit={editId ? handleEditForm : handleSubmitForm}>
                    <TextDetailContainer>
                        <InputContainer>
                            <InputLabel>Product </InputLabel>
                            <Input type='text' value={product} onChange={(e) => setProduct(e.target.value)} onFocus={handleInputFocus}/>
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>Price </InputLabel>
                            <Input type='text' value={price} onChange={(e) => setPrice(e.target.value)} onFocus={handleInputFocus}/>
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>Type </InputLabel>
                            <Select value={type} onChange={(e) => setType(e.target.value)} onFocus={handleInputFocus}>
                                <Option value="Appetiser">Appetiser</Option>
                                <Option value="Main">Main course</Option>
                                <Option value="Dessert">Dessert</Option>
                                <Option value="Beverage">Beverage</Option>
                                <Option value="Alchohol">Alchohol</Option>
                            </Select>
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>Description </InputLabel>
                            <InputLong type='text' rows='8' value={desc} onChange={(e) => setDesc(e.target.value)} onFocus={handleInputFocus}/>
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>Upload </InputLabel>
                            <Input type='file' id='input' accept='image/*' onChange={(e) => setSelectFile(e.target.files[0])} onFocus={handleInputFocus}/>
                        </InputContainer>
                        {editId ? <AddButton type="submit">Update this product</AddButton> : <AddButton type="submit">Add this product</AddButton>}
                        {editMode && <AddButton onClick={handleGiveUpEdit}>I am actually fine.</AddButton>}
                    </TextDetailContainer>
                </AddProductForm>}
            </AddProductContainer>

            <OptionContainer>
                <ProductsOption onClick={() => setFilter('Appetiser')}>Appetiser</ProductsOption>
                <ProductsOption onClick={() => setFilter('Main')}>Main</ProductsOption>
                <ProductsOption onClick={() => setFilter('Dessert')}>Dessert</ProductsOption>
                <ProductsOption onClick={() => setFilter('Beverage')}>Beverage</ProductsOption>
                <ProductsOption onClick={() => setFilter('Alchohol')}>Alchohol</ProductsOption>
            </OptionContainer>

            <ShowProductsContainer>
                {currentBookings !== '' && currentBookings.map((product) => (
                    <ProductContainer key={product.id}>
                        <ProductImageConatiner>
                            <ProductImage src={product.url}/>
                        </ProductImageConatiner>
                        <ProductTextContainer>
                            <ProductInfo>{product.product}</ProductInfo>
                            <ProductInfo>{product.price}</ProductInfo>
                            <ProductInfo>{product.type}</ProductInfo>
                            <ProductInfo>{product.description}</ProductInfo>
                        </ProductTextContainer>
                        <ButtonsContainer>
                            <EditButton smooth to={`${pathname}#input`} onClick={() => addDataToEdit(product)} >Edit</EditButton>
                            <DeleteButton onClick={() => handleClickDelete(product.id, product.type)}>Delete</DeleteButton>
                        </ButtonsContainer>
                    </ProductContainer>
                ))}
                <Pagination bookingsPerPage={bookingsPerPage} totalBookings={initProducts.length} currentPage={currentPage} paginate={paginate}/>
            </ShowProductsContainer>
            {isSubmit && <Loader isLoad={isSubmit}/>}
            {isLoading && <Loader isLoad={isLoading}/>}
        </Root>
    )
}