import {requestAuth} from '../helpers/api';

export const getAllJobs = () => {
    return requestAuth({
        url: '/jobs'
    })
};

export const getJobDetails = (id) => {
    return requestAuth({
        url: '/jobs/' + id
    })
};

export const createJob = (data) => {
    return requestAuth({
        url: '/jobs',
        method: 'POST',
        data
    })
};

export const updateJob = (id, data) => {
    return requestAuth({
        url: '/jobs/' + id,
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
            collection: 'jobs'
        }
    })
};

export const deleteJob = (id) => {
    return requestAuth({
        url: '/jobs/' + id,
        method: 'DELETE'
    })
};