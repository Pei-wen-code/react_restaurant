import { getAuthToken } from './utils';

const BASE_URL = 'http://localhost:5000';

// login, register and user authentication
export const register = (username, email, password) => {
    return fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({username, email, password}),
    })
    .then((res) => res.json());
};

export const getMe =() => {
    const token = getAuthToken();
    
    return fetch(`${BASE_URL}/getme`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => res.json());
};

export const login = (username, password) => {

    return fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    })
    .then((res) => res.json());
};

// reservation CRUD
export const getReserve = (date) => {
    return fetch(`${BASE_URL}/reserve/${date}`, {
        method: 'GET',
    })
    .then((res) => res.json());
};

export const createReserve = (rsvdetail) => {
    const token = getAuthToken();

    return fetch(`${BASE_URL}/reserve`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(rsvdetail)
    }).then((res) => res.json());
};

export const getUserInfo = (username) => {
    return fetch(`${BASE_URL}/userinfo/${username}`, {
        method: 'GET',
    }).then((res) => res.json())
}

export const getUserBooking = (username) => {
    return fetch(`${BASE_URL}/userbooking/${username}`, {
        method: 'GET',
    }).then((res) => res.json())
};

export const updateEmail = (email, id) => {
    const token = getAuthToken();

    return fetch(`${BASE_URL}/updatemail/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({email})
    }).then((res) => res.json())
}

export const isPaid = (id) => {
    const token = getAuthToken();

    return fetch(`${BASE_URL}/ispaid/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    }).then((res) => res.json())
};

export const deleteReserve = (id) => {
    const token = getAuthToken();

    return fetch(`${BASE_URL}/cancel/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then((res) => res.json())
};

export const updateReserve = (id, newDate, time, num) => {
    const token = getAuthToken();

    return fetch(`${BASE_URL}/update/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({newDate, time, num})
    }).then((res) => res.json())
}

// product CRUD
export const addProduct = (formData) => {
    const token = getAuthToken();

    return fetch(`${BASE_URL}/product`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData
    }).then((res) => res.json());
};
export const updateItemFile = (formData, id) => {
    const token = getAuthToken();
    
    return fetch(`${BASE_URL}/product/update/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData
    }).then((res) => res.json());
};
export const updateItemText = ({product, price, type, desc, editId}) => {
    const token = getAuthToken();
    return fetch(`${BASE_URL}/product/updatetext/${editId}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product, price, type, desc }),
    })
    .then((res) => res.json());
};

export const getProducts = (type) => {
    const token = getAuthToken();
    return fetch(`${BASE_URL}/product/${type}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());
};

export const deleteProduct = (id) => {
    const token = getAuthToken();
    return fetch(`${BASE_URL}/product/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json())
};