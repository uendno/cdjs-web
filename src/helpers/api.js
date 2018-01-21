import {API_END_POINT} from '../config';
import localStorageSrv from '../services/localStorage';

const processResponse = async (res) => {
    const json = await res.json();

    if (res.status >= 400) {
        const error = new Error(res.statusText);
        error.statusCode = res.status;
        error.response = json;
        error.message = json.message;
        throw error;
    }

    return json.data;
};

export const request = async ({url = '/', method = 'GET', params = {}, data = {}, headers = {}}) => {
    let queryString = '';

    Object.keys(params).forEach((key, index) => {
        if (index === 0) {
            queryString = queryString + `?${key}=${params[key]}`
        } else {
            queryString = queryString + `&${key}=${params[key]}`
        }
    });

    switch (method) {
        case 'POST':
        case 'PUT': {

            const res = await fetch(API_END_POINT + url + queryString, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },

                body: JSON.stringify(data)
            });

            return processResponse(res);
        }

        case 'GET':
        case 'DELETE':
        default: {


            const res = await fetch(API_END_POINT + url + queryString, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                }
            });

            return processResponse(res);
        }
    }
};

export const requestAuth = async ({url = '/', method = 'GET', params = {}, data = {}, headers = {}}) => {
    const newHeaders = {
        ...headers,
        'Authorization': localStorageSrv.get('accessToken')
    };

    return request({url, method, params, data, headers: newHeaders})
};