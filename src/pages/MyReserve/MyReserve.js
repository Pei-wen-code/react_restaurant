import { React, useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { AuthContext } from '../../context';
import { getUserInfo, getUserBooking, updateEmail, isPaid } from '../../WebAPIs';
import { initAvailableTime, isEmailValid } from '../../utils';
import { device } from '../../constants/devices';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';
import vegeimg from '../../imgs/healthy-eating.svg';
require('dotenv').config();

const reuseBookedInfo = css`
    margin: 20px 5px;
    padding: 20px 20px;
    text-align: center;
`;

const reuseSideBarBtn = css`
    background: ${(props) => (props.$tagColor) ? 'rgba(163, 222, 162, 0.5)' : 'none'};

    @media ${device.mobileXS} {
        width: 100%;
        height: 70px;
        margin: 20px 0;
        border: none;
        border-left: 12px solid rgba(163, 222, 162, 0.5);
        padding-left: 16px;
        text-align: start;
        border-radius: 8px;
    };

    @media ${device.laptop} {
        width: 70%;
        height: 40px;
    };

    @media ${device.laptopL} {
        margin: 10px 0;
    };
`;

const reuseBtn = css`
    @media ${device.mobileXS} {
        width: 200px;
        background: #fefff8;
        margin: 20px 10px;
        border: none;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.11);
        padding: 16px;
        transition: transform 0.5s;

        &:hover {
            background: #fece35;
            transform: scale(1.1);
        };
    };

    @media ${device.laptopL} {
        width: 150px;
        margin-left: 20px;
    };
`;

const reuseCard = css`
    @media ${device.mobileXS} {
        width: 130%;
        height: 238px;
        background: rgba(163, 222, 162, 0.5);
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 8px;
    };

    @media ${device.laptop} {
        width: 100%;
    };
`;

const Root = styled.div`
    width: 100%;
    min-height: 100vh;
    background: #fefff8;
    padding: 200px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const UserContanier = styled.main`
    @media ${device.mobileXS} {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
    };

    @media ${device.laptop} {
        flex-direction: row;
        align-items: initial;
    };
`;
const UserInfoContainer = styled.section`
    @media ${device.mobileXS} {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    };

    @media ${device.laptop} {
        width: 30%;
    };
`;

const UserInfo = styled.h3`
    font-family: 'Permanent Marker', cursive;
`;

const RevealBooking = styled.button`
    ${reuseSideBarBtn};
    background: ${(props) => (!props.$tagColor) ? 'rgba(163, 222, 162, 0.5)' : 'none'};
    margin-top: 20px;
`;

const EditEmail = styled.button`
    ${reuseSideBarBtn};
    margin-top: 20px;
`;

const UserBookingContainer = styled.section`
    @media ${device.mobileXS} {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
    };

    @media ${device.laptop} {
        width: 70%;
        margin-left: 20px;
    };
`;

const UpdateForm = styled.form`
    ${reuseCard};

    @media ${device.mobileXS} {
        justify-content: center;
    };
 
    @media ${device.laptop} {
        flex-direction: row;
    };
`;

const Input = styled.input`
    @media ${device.mobileXS} {
        width: 80%;
        height: 40px;
        border-width: 2px;
        border-radius: 4px;
        margin: 20px 0px;
    };

    @media ${device.mobileM} {
        width: 90%;
    }

    @media ${device.tablet} {
    };

    @media ${device.laptopL} {
        width: 250px;
        margin-left: 10px;
    };
`;

const Email = styled.div`
    @media ${device.mobileXS} {
        text-align: center;
        font-weight: bold;
    };
`;

const UpdateEmail = styled.button`
    ${reuseBtn};
`;

const PromoteContainer = styled.div`
    ${reuseCard};
`;

const ReserveImage = styled.img`
    width: 238px;
    height: 238px;
`;

const CreateBookingContainer =styled.div`
    position: relative;
    top: -80px;
`;

const CreateBooking = styled(Link)`
    color: #fefff8;
    font-family: 'Permanent Marker', cursive;
    font-size: 28px;

    &:hover {
        color: #fece35;
        text-decoration: none;
    };
`;

const UserBookingDetails = styled.section`
    ${reuseCard};
    @media ${device.mobileXS} {
        height: auto;
        padding: 20px 0;
        margin-bottom: 20px;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;

        &:nth-child(1) {
            margin-top:0px;
        };
    };
`;

const FirstName = styled.h6`
    width: 130px;
    ${reuseBookedInfo};
`;

const LastName = styled.h6`
    width: 130px;
    ${reuseBookedInfo};
`;

const Date = styled.h6`
    width: 130px;
    ${reuseBookedInfo};
`;

const Time = styled.h6`
    width: 80px;
    ${reuseBookedInfo};
`;

const Number = styled.h6`
    width: 50px;
    ${reuseBookedInfo};
`;

const FeeStatus = styled.h6`
    width: 400px;
    ${reuseBookedInfo};
`;

const PayButton = styled.button`
    ${reuseBtn};
`;

const Warning = styled.div`
    @media ${device.mobileXS} {
        width: 100%;
        background: #fece35;
        text-align: center;
        margin: 20px 0;
        border-radius: 8px;
        padding: 10px;
    };

    @media ${device.laptop} {
        width: 70%;
    };
`;

const Highlight = styled.span`
    color: red;
    font-weight: bold;
`;

const DocLink = styled.a``;

const ErrorMessage = styled.div`
    text-align: center;
    color: red;
`;

export default function MyReserve() {
    const { user } = useContext(AuthContext)
    const [payStatus, setPayStatus] = useState(false);
    const [userBooking, setUserBooking] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [product] = useState({
        name: 'bookingfee',
        price: 10
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(3);

    const makePayment = (token) => {
        return fetch('http://localhost:5000/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token, product})
        })
        .then((result) => {
            if (result.status === 200) {
                setPayStatus(true)
            }
        })
        .catch((err) => {
            return setErrorMessage(err)
        });
    };
    const handleUpdatePay = (id) => {
        isPaid(id)
        .then((response) => {
            if (response.ok !== 1) return setErrorMessage(response.message) 
        })
        .catch((err) => {
            return setErrorMessage(err)
        });
    };
    const handleInputFocus = () => {
        setErrorMessage('');
    };

    const handleEditMode = (email) => {
        setUserBooking('');
        setEditMode(true);
        setEmail(email);
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (!isEmailValid(email)) return setErrorMessage('Invalid email.');

        setIsSubmit(true);
        updateEmail(email, userInfo.id).then((response) => {
            if (response.ok !== 1) {
                setIsSubmit(false);
                return setErrorMessage(response.message);
            }
            getUserInfo(user).then((response) => {
                if (response.ok !== 1) return setErrorMessage(response.message);
                setIsSubmit(false);
                setEditMode(false);
                setEmail('');
                setUserInfo(response.message);
                handleEditMode(email);
            }).catch((err) => {
                setIsSubmit(false);
                return setErrorMessage(err.message);
            });
        }).catch((err) => {
            setIsSubmit(false);
            return setErrorMessage(err.message);
        });
    };

    const handleGetUserBookings = (user) => {
        getUserBooking(user)
        .then((response) => {
            if (response.ok !== 1) return setErrorMessage(response.message);
            setUserBooking(response.message);
            setEditMode(false);
            setIsLoading(false);
            // setSuccessUpdate(null);
        })
        .catch((err) => {
            setIsLoading(false);
            return setErrorMessage(err);
        });
    };

    useEffect(() => {
        setIsLoading(true);
        getUserInfo(user)
        .then((response) => {
            if (response.ok !== 1) return setErrorMessage(response.message);
            setUserInfo(response.message);

            getUserBooking(user)
            .then((response) => {
                if (response.ok !== 1) return setErrorMessage(response.message);
                setUserBooking(response.message);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                return setErrorMessage(err);
            });
        }).catch((err) => {
            setIsLoading(false);
            return setErrorMessage(err);
        });
    }, [user]);

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = userBooking.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    return(
        <Root>
            <UserContanier>
                <UserInfoContainer>
                        <UserInfo>Welcome {user}</UserInfo>
                        <RevealBooking $tagColor={editMode} onClick={() => handleGetUserBookings(user)}>See my bookings</RevealBooking>
                        <EditEmail $tagColor={editMode} onClick={() => handleEditMode(userInfo.email)}>Check account setting</EditEmail>
                        {userBooking.length !== 0 && 
                            <Warning>
                                <Highlight>For testing payment</Highlight>:
                                4242 4242 4242 4242 (the tested card number), 
                                12/21 (tested card expire date), 
                                123 (tested CVC).
                                Explore <DocLink href='https://stripe.com/docs/testing'>this document</DocLink> for testing payment.
                            </Warning>
                        }
                </UserInfoContainer>

                <UserBookingContainer>
                    {editMode && 
                        <UpdateForm onSubmit={handleSubmitForm}>
                            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                            {editMode && <Email>Your email is <Input value={email} onChange={(e) => setEmail(e.target.value)} onFocus={handleInputFocus}/></Email>}
                            {editMode && <UpdateEmail type="submit">Update now</UpdateEmail> }
                        </UpdateForm>
                    }
                    {userBooking && userBooking.length === 0 && 
                    <PromoteContainer>
                        <ReserveImage src={vegeimg} alt=""/>
                        <CreateBookingContainer>
                            <CreateBooking to={'/reserve'}>Click me !</CreateBooking>
                        </CreateBookingContainer>
                    </PromoteContainer>
                    }
                    {currentBookings !== '' && currentBookings.map((booking) => 
                        <UserBookingDetails key={booking.id}>
                            <Date>{booking.date}</Date>
                            <FirstName>{booking.firstname}</FirstName>
                            <LastName>{booking.lastname}</LastName>
                            <Time>{initAvailableTime()[booking.timeIndex].time}</Time>
                            <Number>{booking.num}</Number>
                            {payStatus || booking.isPaid ? <FeeStatus>All set! We are looking forward seeing you!</FeeStatus> : <FeeStatus>Please pay $10 for completing your booking.</FeeStatus>}
                            {payStatus && handleUpdatePay(booking.id)}
                            {payStatus === false && booking.isPaid === 0 && <StripeCheckout 
                                stripeKey={process.env.REACT_APP_KEY} 
                                name="Pay Booking Fee"
                                token={makePayment} 
                                amount={product.price * 100} 
                                shippingAddress 
                                billingAddress
                            >
                                <PayButton>Pay with card</PayButton>
                            </StripeCheckout>}
                        </UserBookingDetails>)
                    }
                </UserBookingContainer>
            </UserContanier>
            <Pagination bookingsPerPage={bookingsPerPage} totalBookings={userBooking.length} currentPage={currentPage} paginate={paginate}/>
            {isSubmit && <Loader isLoad={isSubmit}/>}
            {isLoading && <Loader isLoad={isLoading}/>}
        </Root>
    )
}