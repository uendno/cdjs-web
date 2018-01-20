import config from '../config';

const baseUrl = config.api.uri;

export const login = async (email, password) => {
    const response = await fetch(baseUrl + '/auth/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        }),
    });

    const json = await response.json();

    if (response.status >= 400) {
        const error = new Error(response.statusText);
        error.response = json;
        throw error;
    }

    return json.data;
};