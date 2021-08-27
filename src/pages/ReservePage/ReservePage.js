import { React, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { device } from '../../constants/devices';
import { initAvailableTime, updatedAvailableTime, isPhoneValid } from '../../utils';
import { AuthContext } from '../../context';
import { getUserBooking, createReserve, getReserve } from '../../WebAPIs';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

const Root = styled.div`
    width: 100%;
    background: #fefff8;
    padding: 200px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const StepsContainer = styled.div`
    width: 93%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DayPicker = styled.section`
    width:100%;
    display: flex;
    justify-content: center;
`;

const Title = styled.h1`
    text-align: center;
    border-left: 12px solid #a3dea2;
    border-radius: 8px;
    padding-left: 16px;
    font-family: 'Permanent Marker', cursive;
`;

const CalendarContainer = styled.div`
    padding-top: 100px;
    padding-bottom: 150px;

    @media ${device.mobileXS} {
        width: 100%;
    };
    @media ${device.mobileS} {
        width: 100%;
    };
    @media ${device.tablet} {
        width: 350px;
    };
`;

const TimePicker = styled.div`
    width: 80%;
    padding-top: 100px;
    padding-bottom: 150px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const SelectInfo = styled.h5`
    padding-top: 30px;
    text-align: center;
    font-family: 'Permanent Marker', cursive;
    color: #fece35;
`;

const TimeOptions = styled.div`
    width: 120px;;
    background: #fece35;
    margin-bottom: 30px;
    border-radius: 8px;
    padding: 16px;
    display: ${(props) => ( props.$stillAvailable ? 'inline' : 'none')};
    text-align: center;

    & + & {
        margin-left: 10px;
    };

    &:first-child {
        margin-left: 10px;
    };
    
    &:hover {
        font-weight: bold;
        color: #fefff8;
    }
`;

const ReserveForm = styled.form`
    padding-top: 100px;
    display: flex;
    flex-direction: column;

    @media ${device.mobileXS} {
        width: 70%;
    };
    @media ${device.mobileS} {
        width: 60%;
    };
    @media ${device.laptopL} {
        width: 50%;
    };
`;

const InputContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const InputLabel = styled.label`
    width: 86px;
    margin: 10px 10px;

    @media ${device.mobileXS} {
        text-align: center;
    };
    @media ${device.laptop} {
        text-align: left;
    };
`;

const Input = styled.input`
    height: 38px;
    margin: 10px 10px;
    border-radius: 5px;
    
    @media ${device.mobileXS} {
        width:100%;
    };

    @media ${device.tablet} {
        width: 70%;
    };
`;

const Button = styled.button`
    @media ${device.mobileXS} {
        width: 90%;
        margin: 30px auto;
        border-radius: 8px;
        border: none;
        box-shadow: 0 5px 15px rgba(0,0,0,0.11);
        padding: 20px;
        background: #fece35;
        transition: transform 0.5s;

        &:hover {
            transform: scale(1.1);
        }
    };

    @media ${device.tabletL} {
        width: 45%;
    };
`;

export default function ReservePage() {
    const { user, userId } = useContext(AuthContext);
    const [userBooking, setUserBooking] = useState('');
    const [value, onChange] = useState(new Date());
    const [availableTime, setAvaialbleTime] = useState(() => initAvailableTime());
    const [timeChoosen, setTimeChosen] = useState('');
    const [timeDisplay, setTimeDisplay] = useState('');
    const [dateChoosen, setDateChoosen] = useState(() => {
        const today = new Date();
        const initDate = today.toDateString().split(' ');
        return `${initDate[1]}${initDate[2]}${initDate[3]}`
    });
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [mobile, setMobile] = useState('');
    const [num, setNum] = useState('');
    const [leftNum, setLeftNum] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const history = useHistory();

    const handleDateClick = (value, event) => {
        const date = value.toString().split(' ');
        setDateChoosen(`${date[1]}${date[2]}${date[3]}`);
    };
    const handleClickTime = (time) => {
        setTimeChosen(time.index);
        setTimeDisplay(time.time);
        setLeftNum(10 - time.num);
    };
    const handleInputFocus = () => {
        setErrorMessage('');
    };
    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        if (isSubmit || errorMessage) return;
        if (firstname[0] === ' ' || lastname[0] === ' ' || mobile[0] === ' ' || num[0] === ' ') return setErrorMessage('Please do not type space.');
        if (!firstname || !lastname || !mobile || !num ) return setErrorMessage('You must fill all fields.');
        if (!isPhoneValid(mobile)) return setErrorMessage('Incorrect mobile number');
        if (timeChoosen === '' || !dateChoosen ) return setErrorMessage('You must choose a day or a time.');
        if (num > 10 || num > leftNum) return setErrorMessage('Sorry. We can only take 10 customers maximum in each slot.')

        const notPaid = userBooking.filter(booking => booking.isPaid === 0);
        if (notPaid.length !== 0) {
            setErrorMessage('Sorry, you need to payoff your previous booking first.');
            return
        };
        setIsSubmit(true);
        createReserve({ user, userId, firstname, lastname, mobile, num, dateChoosen, timeChoosen})
        .then((response) => {
            if (response.ok !== 1) {
                setIsSubmit(false);
                return setErrorMessage(response.message)
            };
            setIsSubmit(false);
            history.push('/reserve/user');
        }).catch((err) => {
            setIsSubmit(false);
            return setErrorMessage(err.message);
        });
    };

    useEffect(() => {
        getReserve(dateChoosen).then((response) => {
            if (response.ok !== 1) return setErrorMessage(response.message);
            setAvaialbleTime(updatedAvailableTime(response.message));
        }).catch((err) => {
            return setErrorMessage(err);
        });

        getUserBooking(user)
        .then((response) => {
            if (response.ok !== 1) return setErrorMessage(response.message);
            setUserBooking(response.message);
        })
        .catch((err) => {
            return setErrorMessage(err);
        });
    }, [dateChoosen, user, userId])

    return(
        <Root>
            <StepsContainer>
                <Title>Step 1: Pick a day you like</Title>
                <DayPicker>
                    <CalendarContainer>
                        <Calendar onChange={onChange} value={value} onClickDay={handleDateClick} />
                    </CalendarContainer>
                </DayPicker>
                <Title>Step 2: Select a time by a click</Title>
                {leftNum && <SelectInfo>You have choosen {timeDisplay}, it is still available for {leftNum} customers.</SelectInfo>}
                <TimePicker>
                    {availableTime.map(time => <TimeOptions key={time.index} onClick={() => handleClickTime(time)} $stillAvailable={time.isAvailable} >{time.time}</TimeOptions>)}
                </TimePicker>
                <Title>Step 3: Fill in booking detail</Title>
                <ReserveForm>
                    <InputContainer>
                        <InputLabel>First Name </InputLabel>
                        <Input value={firstname} onChange={(e) => setFirstname(e.target.value)} onFocus={handleInputFocus}/>
                    </InputContainer>
                    <InputContainer>
                        <InputLabel>Last Name </InputLabel>
                        <Input value={lastname} onChange={(e) => setLastname(e.target.value)} onFocus={handleInputFocus}/>
                    </InputContainer>
                    <InputContainer>
                        <InputLabel>UK Mobile </InputLabel>
                        <Input value={mobile} onChange={(e) => setMobile(e.target.value)} onFocus={handleInputFocus}/>
                    </InputContainer>
                    <InputContainer>
                        <InputLabel>Reserve for </InputLabel>
                        <Input value={num} onChange={(e) => setNum(e.target.value)} onFocus={handleInputFocus}/>
                    </InputContainer>
                    <Modal open={modalOpen} close={() => setModalOpen(false)} submit={handleSubmitForm} errorMessage={errorMessage}>
                        Your are reserving for {num || '0'} at {timeDisplay || '00:00'} on {dateChoosen}. <br />
                        Confirm this booking and pay $10 for reserving tables?<br />
                    </Modal>
                </ReserveForm>
                <Button onClick={()=> setModalOpen(true)}>Reserve my table</Button>
            </StepsContainer>
            {isSubmit && <Loader isLoad={isSubmit}/>}
        </Root>
    )
}