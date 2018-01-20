import {LOGIN_REQUEST, LOGIN_COMPLETE, LOGIN_ERROR} from './types';
import * as apiHelper from '../helpers/api';
import * as graphQLHelper from '../helpers/graphql';

export const login = async (username, password) => ({
    func: async (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST,
            username,
            password
        });

        const accessToken = await apiHelper.login(username, password);
        localStorage.setItem('accessToken', accessToken);

        dispatch({
            type: LOGIN_COMPLETE,
            accessToken
        });

        graphQLHelper.createClient(accessToken);

        return true;
    },

    errorType: LOGIN_ERROR
});