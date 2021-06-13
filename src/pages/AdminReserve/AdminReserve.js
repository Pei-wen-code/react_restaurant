import { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { device } from '../../constants/devices';
import { initAvailableTime, updatedAvailableTime, datePicker, monthPicker } from '../../utils';
import { getReserve, deleteReserve, updateReserve } from '../../WebAPIs';
import Pagination from '../../components/Pagination';

const reuseBooked = css`
    width: 200px;
    margin: 10px 10px;
    line-height: 3;
`;

const reuseBtn = css`
    width: 200px;
    background:  #fefff8;
    margin: 10px 10px;
    border: none;
    border-radius: 8px;
    padding: 10px 10px;
    transition: transform 0.5s;

    &:hover {
        transform: scale(1.1);
    };
`;

const reuseEdit = css`
    margin: 10px 10px;
    height: 40px;
    border-radius: 8px;
    border-color: black;
    border-width: 2px;
`;

const Root = styled.div`
    width: 100%;
    background:  #fefff8;
    padding: 100px 0;
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
        height: 2100px;
    };

    @media ${device.tablet} {
        top: -70px;
        height: 1300px;
    };

    @media ${device.laptop} {
        top: -70px;
        height: 1000px;
    };
`;

const BookingInfoContainer = styled.main`
    width: 80%;
    background:  #fefff8;
    display: flex;
    flex-direction: column;
`;
const LeftNum = styled.h5`
    margin: 30px auto;
    color: green;
`;

const TimePicker = styled.div`
    width: 80%;
    margin: 50px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Title = styled.h2`
    margin: 30px 0;
    text-align: center;
`;

const EditContainer = styled.form`
    border-radius: 8px;
    padding: 5px;
    display: flex;
    background: #fece35;
    align-items: center;
    justify-content: space-around;

    @media ${device.mobileXS} {
        flex-direction: column;
    };
    @media ${device.laptop} {
        flex-direction: row;
    };
`;

const EditLabel = styled.div`
    margin: 10px 10px;
`;

const EditMonthSelect = styled.select`
    width: 150px;
    ${reuseEdit};
`;

const EditDateSelect = styled.select`
    width: 60px;
    ${reuseEdit};
`;

const Option = styled.option``; 

const EditYearInput = styled.input`
    width: 100px;
    ${reuseEdit};
`;

const EditTimeSelect = styled.select`
    width: 80px;
    ${reuseEdit};
`;
const EditNumInput = styled.input`
    width: 200px;
    ${reuseEdit};
`;

const TimeOptions = styled.div`
    width: 120px;
    background: #fece35;
    margin-bottom: 30px;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    display: ${(props) => ( props.$stillAvailable ? 'inline' : 'none')};

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

const CalendarContainer = styled.div`
    margin: 10px auto;

    @media ${device.mobileXS} {
        width: 220px;
    };
    @media ${device.mobileS} {
        width: 250px;
    };
    @media ${device.mobileM} {
        width: 300px;
    };
    @media ${device.tablet} {
        width: 360px;
    };
`;

const BookedInfoConatiner = styled.section`
    width: 100%;
    background: rgba(163, 222, 162, 0.5);
    margin: 20px 0;
    border-radius: 8px;
    padding: 10px 10px;
    display: flex;
    flex-wrap: wrap;
    
    @media ${device.mobileS} {
        justify-content: center;
    };
    @media ${device.laptop} {
        justify-content: flex-start;
    };
`;

const BookedDetail = styled.p`
    width: 200px;
    margin: 10px 10px;
    line-height: 3;

    @media ${device.mobileXS} {
        overflow: auto;
    };
    @media ${device.mobileL} {
        overflow: visible;
    };
`;

const BookedDetailDate = styled.p`
    ${reuseBooked};
`;

const BookedDetailTime = styled.p`
    ${reuseBooked};
`;

const BookedDetailNum = styled.p`
    ${reuseBooked};
`;
// rwd margin-left: 70px
const ButtonsContainer = styled.section`
    display: flex;

    @media ${device.mobileXS} {
        width: 200px;
        flex-direction: column;
        align-items: center;
    };
    @media ${device.laptop} {
        width: 600px;
        padding-left: 200px;
        flex-direction: row;
        justify-content: center;
    };
    @media ${device.laptopL} {
        width: 440px;
        padding-left: 80px;
    };
`;

const EditButton = styled.button`
    ${reuseBtn};
`;

const DeleteButton = styled.button`
    ${reuseBtn};
`;

const SubmitButton = styled.button`
    ${reuseBtn};
`;

const ErrorMessage = styled.div`
    text-align: center;
    color: red;
`;


export default function AdminReserve() {
    const [value, onChange] = useState(new Date());
    const [availableTime, setAvaialbleTime] = useState(() => initAvailableTime());
    const [leftNum, setLeftNum] = useState('');
    const [dayBooking, setDayBooking] = useState('');
    const [editData, setEditData] = useState('');
    const [editMonth, setEditMonth] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editTime, setEditTime] = useState('');
    const [editYear, setEditYear] = useState('');
    const [editNum, setEditNum] = useState('');
    const [dateChoosen, setDateChoosen] = useState(() => {
        const today = new Date();
        const initDate = today.toDateString().split(' ');
        return `${initDate[1]}${initDate[2]}${initDate[3]}`
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(3);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const newDate = editMonth+editDate+editYear;
        if( newDate.length <= 4 || editTime === '' ) return setErrorMessage('You must choose date and time.');
        updateReserve(editData.id, newDate, editTime, editNum).then((response) => {
            if (response.ok !== 1) return setErrorMessage(response.message); 
            getReserve(newDate).then((response) => {
                if (response.ok !== 1) return setErrorMessage(response.message);
                setAvaialbleTime(updatedAvailableTime(response.message));
                setDayBooking(response.message);
                setEditMonth('');
                setEditDate('');
                setEditYear('');
                setEditTime('');
                setEditNum('');
                setEditData('');
            }).catch((err) => {
                return setErrorMessage(err)
            })
        }).catch((err) => {
            return setErrorMessage(err)
        });
    }
    const handleDateClick = (value, event) => {
        const date = value.toString().split(' ');
        setDateChoosen(`${date[1]}${date[2]}${date[3]}`);
    };
    const handleClickTime = (num) => {
        setLeftNum(10-num)
    };
    const handleClickEdit = (booking) => {
        setEditData(booking);
    };
    const handleInputFocus = () => {
        setErrorMessage('');
    };
    const handleClickDelete = (id) => {
        deleteReserve(id).then((response) => {
            if (response.ok !== 1) {
                setErrorMessage(response.message)
            };
            getReserve(dateChoosen).then((response) => {
                if (response.ok !== 1) return setErrorMessage(response.message);
                setAvaialbleTime(updatedAvailableTime(response.message));
                setDayBooking(response.message)
            }).catch((err) => {
                return setErrorMessage(err);
            });
        }).catch((err) => {
            return setErrorMessage(err);
        });
    };

    useEffect(() => {
        setIsLoading(true);
        getReserve(dateChoosen).then((response) => {
            if (response.ok !== 1) return setErrorMessage(response.message);
            setAvaialbleTime(updatedAvailableTime(response.message));
            setDayBooking(response.message);
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            return setErrorMessage(err)
        });
    }, [dateChoosen]);

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = dayBooking.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    return (
        <Root>
            <BookingInfoContainer>
                <Title>Time still available</Title>
                <CalendarContainer>
                        <Calendar onChange={onChange} value={value} onClickDay={handleDateClick}/>
                </CalendarContainer>
                {leftNum && <LeftNum>This slot is still available for {leftNum} customers.</LeftNum>}
                <TimePicker>
                    {availableTime && availableTime.map(time => 
                        <TimeOptions key={time.index} onClick={() => handleClickTime(time.num)} $stillAvailable={time.isAvailable}>{time.time}</TimeOptions>
                    )}
                </TimePicker>
                <Title>Booking of the day</Title>
                {editData && 
                <EditContainer onSubmit={handleSubmitForm}>
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <EditLabel>{editData.firstname}</EditLabel>
                    <EditMonthSelect value={editMonth} onChange={(e) => setEditMonth(e.target.value)} onFocus={handleInputFocus}>
                        {monthPicker().map(month => <Option key={month.index} value={month.value}>{month.display}</Option>)}
                    </EditMonthSelect>
                    <EditDateSelect value={editDate} onChange={(e) => setEditDate(e.target.value)} onFocus={handleInputFocus}>
                        {datePicker().map(date => <Option key={date.value} value={date.value}>{date.display}</Option>)}
                    </EditDateSelect>
                    <EditYearInput value={editYear} onChange={(e) => setEditYear(e.target.value)} placeholder="year" required/>
                    <EditTimeSelect value={editTime} onChange={(e) => setEditTime(e.target.value)} placeholder="time" onFocus={handleInputFocus}>
                        {initAvailableTime().map(time => <Option key={time.index} value={time.index}>{time.time}</Option>)}
                    </EditTimeSelect>
                    <EditNumInput value={editNum} onChange={(e) => setEditNum(e.target.value)} placeholder="number of customers" required/>
                    <SubmitButton type="submit">Update booking</SubmitButton>
                </EditContainer>}
                {currentBookings && currentBookings.map(booking => 
                <BookedInfoConatiner key={booking.id}>
                    <BookedDetail>First name: {booking.firstname}</BookedDetail>
                    <BookedDetail>Last name: {booking.lastname}</BookedDetail>
                    <BookedDetailDate>Date: {booking.date}</BookedDetailDate>
                    <BookedDetailTime>Time: {initAvailableTime()[booking.timeIndex].time}</BookedDetailTime>
                    <BookedDetail>Phone: {booking.mobile}</BookedDetail>
                    <BookedDetailNum>Number: {booking.num}</BookedDetailNum>
                    <BookedDetail>Paid: {booking.isPaid === 0 ? 'Not yet' : 'Yes'}</BookedDetail>
                    <BookedDetail>Email:{booking.User.email}</BookedDetail>
                    <ButtonsContainer>
                        <EditButton onClick={() => handleClickEdit(booking)}>Edit</EditButton>
                        <DeleteButton onClick={() => handleClickDelete(booking.id)}>Delete</DeleteButton>
                    </ButtonsContainer>
                </BookedInfoConatiner>)}
                <Pagination bookingsPerPage={bookingsPerPage} totalBookings={dayBooking.length} currentPage={currentPage} paginate={paginate}/>
            </BookingInfoContainer>
            {isLoading && <Loading><h1>L o a d i n g ... </h1></Loading>}
        </Root>
    )
}