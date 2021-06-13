export const isEmailValid = (email) => {
    const rule = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return rule.test(email.toString());
};

export const isPhoneValid = (phone) => {
    const rule = /((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/;
    return rule.test(phone.toString());
};

export const isPwValid = (password) => {
    const rule = /.{8,}/;
    return rule.test(password.toString());
};

const tokenName = 'token';
export const setAuthToken = (token) => {
    localStorage.setItem(tokenName, token)
};

export const getAuthToken = () => localStorage.getItem(tokenName);

export const initAvailableTime = () => [
    { time: '11:00', index: 0, num: 0, isAvailable: true },
    { time: '11:30', index: 1, num: 0, isAvailable: true },
    { time: '12:00', index: 2, num: 0, isAvailable: true },
    { time: '12:30', index: 3, num: 0, isAvailable: true },
    { time: '13:00', index: 4, num: 0, isAvailable: true },
    { time: '18:00', index: 5, num: 0, isAvailable: true },
    { time: '18:30', index: 6, num: 0, isAvailable: true },
    { time: '19:00', index: 7, num: 0, isAvailable: true },
    { time: '19:30', index: 8, num: 0, isAvailable: true },
    { time: '20:00', index: 9, num: 0, isAvailable: true },
    { time: '20:30', index: 10, num: 0, isAvailable: true },
    { time: '21:00', index: 11, num: 0, isAvailable: true },
];

export const updatedAvailableTime = (bookings) => {
    if (bookings.length === 0) return initAvailableTime();
    const newAvaliableTime = initAvailableTime(); 
    bookings.forEach((perBooking) => {
        let totalNum = newAvaliableTime[perBooking.timeIndex].num; //+
        newAvaliableTime[perBooking.timeIndex] = {
            ...newAvaliableTime[perBooking.timeIndex], 
            num: totalNum += perBooking.num, //+
            isAvailable: totalNum === 10 ? false: true //+
        }
    })
    return newAvaliableTime;
};

export const datePicker = () => [
    {value: '01', display: '1'},
    {value: '02', display: '2'},
    {value: '03', display: '3'},
    {value: '04', display: '4'},
    {value: '05', display: '5'},
    {value: '06', display: '6'},
    {value: '07', display: '7'},
    {value: '08', display: '8'},
    {value: '09', display: '9'},
    {value: '10', display: '10'},
    {value: '11', display: '11'},
    {value: '12', display: '12'},
    {value: '13', display: '13'},
    {value: '14', display: '14'},
    {value: '15', display: '15'},
    {value: '16', display: '16'},
    {value: '17', display: '17'},
    {value: '18', display: '18'},
    {value: '19', display: '19'},
    {value: '20', display: '20'},
    {value: '21', display: '21'},
    {value: '22', display: '22'},
    {value: '23', display: '23'},
    {value: '24', display: '24'},
    {value: '25', display: '25'},
    {value: '26', display: '26'},
    {value: '27', display: '27'},
    {value: '28', display: '28'},
    {value: '29', display: '29'},
    {value: '30', display: '30'},
    {value: '31', display: '31'},
];

export const monthPicker = () => [
    {index: '1', value: 'Jan', display: 'January'},
    {index: '2', value: 'Feb', display: 'February'},
    {index: '3', value: 'Mar', display: 'March'},
    {index: '4', value: 'Apr', display: 'April'},
    {index: '5', value: 'May', display: 'May'},
    {index: '6', value: 'Jun', display: 'June'},
    {index: '7', value: 'Jul', display: 'July'},
    {index: '8', value: 'Aug', display: 'August'},
    {index: '9', value: 'Sep', display: 'September'},
    {index: '10', value: 'Oct', display: 'October'},
    {index: '11', value: 'Nov', display: 'November'},
    {index: '12', value: 'Dec', display: 'December'},
]