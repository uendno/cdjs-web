import {requestAuth} from '../helpers/api';

export const getAllCredentials = () => {
    return requestAuth({
        url: '/credentials'
    })
};

export const createCredential = (data) => {
    return requestAuth({
        url: '/credentials',
        method: 'POST',
        data
    })
};

export const updateCredential = (id, data) => {
    return requestAuth({
        url: '/credentials/' + id,
        method: 'PUT',
        data
    })
};

export const deleteCredential = (id) => {
    return requestAuth({
        url: '/credentials/' + id,
        method: 'DELETE',
    })
};

export const validateName = (id, name) => {
    return requestAuth({
        url: '/name-validations',
        method: 'POST',
        data: {
            currentId: id,
            name,
            collection: 'credentials'
        }
    })
};