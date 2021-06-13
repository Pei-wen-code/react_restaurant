import { React, useState, useEffect, useContext } from 'react';
import styled, { css, keyframes } from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';
import { AuthContext } from '../../context';
import { getUserInfo, getUserBooking, updateEmail, isPaid } from '../../WebAPIs';
import { initAvailableTime, isEmailValid } from '../../utils';
import { device } from '../../constants/devices';
import Pagination from '../../components/Pagination';
require('dotenv').config();

const reuseBookedInfo = css`
    margin: 20px 5px;
    padding: 20px 20px;
    text-align: center;
`;

const reuseEmailEdition = css`
    width: 200px;
    height: 60px;
    margin: 20px 10px;
    border: none;
    border-radius: 8px;

    &:hover {
        background: #fece35;
    }
`;

const reuseUserInfo = css`
    padding: 20px 20px;
    text-align: center;

    @media ${device.mobileXS} {
        width: 200px;
    };
    @media ${device.tablet} {
        width: 400px;
    };
`;

const Root = styled.div`
    width: 100%;
    background: #fefff8;
    padding 100px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media ${device.mobileXS} {
        top: -70px;
        height: 2300px;
    };
    @media ${device.mobileM} {
        top: -70px;
        height: 1700px;
    };
    @media ${device.tablet} {
        top: -70px;
        height: 1100px;
    };
    @media ${device.desktop} {
        top: -70px;
        height: 2280px;
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
        height: 1300px;
    };
`;

const UserContanier = styled.main`
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
`;

const UserInfoContainer = styled.form`
    width: 100%;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
`;

const UserInfo = styled.div`
    ${reuseUserInfo};
`;

const Email = styled.div`
    ${reuseUserInfo}
`;

const EditEmail = styled.button`
    ${reuseEmailEdition};
`;

const UpdateEmail = styled.button`
    ${reuseEmailEdition};
`;

const Input = styled.input`
    border-width: 2px;
    border-radius: 4px;

    @media ${device.mobileXS} {
        width: 200px;
    };
    @media ${device.tablet} {
        width: 300px;
    };
`;

const UserBookingContainer = styled.section`
    width: 100%;
    background: rgba(163, 222, 162, 0.5);
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 8px;
`;

const Warning = styled.h6`
    color: red;
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

const Button = styled.div`
    background: #fece35;
    margin: 20px 10px;
    border: none;
    border-radius: 8px;
    padding: 16px;
    transition: transform 0.5s;

    &:hover {
        transform: scale(1.1);
    }
`;

const ErrorMessage = styled.div`
    text-align: center;
    color: red;
`;

export default function MyReserve() {
    const { user } = useContext(AuthContext)
    const [payStatus, setPayStatus] = useState(false);
    const [userBooking, setUserBooking] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [editMode, setEditMode] = useState('');
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
        return fetch('https://agile-taiga-49676.herokuapp.com/payment', {
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
    const handleSubmitForm = (e) => {
        if (!isEmailValid(email)) return setErrorMessage('Invalid email.');
        e.preventDefault();
        setIsSubmit(true);
        updateEmail(email, userInfo.id).then((response) => {
            if (response.ok !== 1) {
                setIsSubmit(false);
                return setErrorMessage(response.message);
            }
            getUserInfo(user).then((response) => {
                if (response.ok !== 1) return setErrorMessage(response.message);
                setIsSubmit(false);
                setEditMode('');
                setEmail('');
                setUserInfo(response.message);
            }).catch((err) => {
                setIsSubmit(false);
                return setErrorMessage(err.message);
            });
        }).catch((err) => {
            setIsSubmit(false);
            return setErrorMessage(err.message);
        });
    };

    useEffect(() => {
        setIsLoading(true);
        getUserInfo(user).then((response) => {
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
                <UserInfoContainer onSubmit={handleSubmitForm}>
                    <UserInfo>Hi, {user} !{userBooking.length === 0 ? ' You do not have any bookings yet.': ' Here are your bookings details.'}</UserInfo>
                    <Email>Your email is {userInfo && userInfo.email}</Email>
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    {editMode && <Input value={email} onChange={(e) => setEmail(e.target.value)} onFocus={handleInputFocus}/>}
                    {editMode ? <UpdateEmail type="submit">Update my email</UpdateEmail> : <EditEmail onClick={() => setEditMode(true)}>Change my email</EditEmail>}
                </UserInfoContainer>
                {userBooking.length !== 0 && 
                    <Warning>
                        !!! Please use ONLY the following card information for testing: 4242 4242 4242 4242 (the tested card number), 12/21 (tested card expire date), 123 (tested CVC).
                        Explore <a href='https://stripe.com/docs/testing'>this document</a> for testing payment.
                    </Warning>
                }
                {currentBookings !== '' && currentBookings.map((booking) => <UserBookingContainer key={booking.id}>
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
                        <Button>Pay with card</Button>
                    </StripeCheckout>}
                </UserBookingContainer>)}
                <Pagination bookingsPerPage={bookingsPerPage} totalBookings={userBooking.length} currentPage={currentPage} paginate={paginate}/>
            </UserContanier>
            {isSubmit && <Loading><h1>Updating email ...</h1></Loading>}
            {isLoading && <Loading><h1>Loading ...</h1></Loading>}
        </Root>
    )
}