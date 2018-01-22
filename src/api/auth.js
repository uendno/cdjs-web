import {request} from '../helpers/api';

export const login = async (email, password) => {
    return request({
        url: '/auth',
        method: 'POST',
        data: {
            email,
            password
        }
    });
};