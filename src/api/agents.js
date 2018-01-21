import {requestAuth} from '../helpers/api';

export const getAllAgents = () => {
    return requestAuth({
        url: '/agents'
    });
};

export const addAgent = (data) => {
    return requestAuth({
        url: '/agents',
        method: 'POST',
        data
    })
};

export const updateAgent = (id, data) => {
    return requestAuth({
        url: '/agents/' + id,
        method: 'PUT',
        data
    })
};

export const validateName = (id, name) => {
    return requestAuth({
        url: '/name-validations',
        method: 'POST',
        data: {
            currentId: id,
            name,
            collection: 'agents'
        }
    })
};

export const deleteAgent = (id) => {
    return requestAuth({
        url: '/agents/' + id,
        method: 'DELETE',
    })
};