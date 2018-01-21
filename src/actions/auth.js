import {LOGIN_REQUEST, LOGIN_COMPLETE, LOGIN_ERROR} from './types';
import * as apiHelper from '../api/auth';
import localStorageSrv from '../services/localStorage';

export const login = async (username, password) => ({
    func: async (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST,
            username,
            password
        });

        const accessToken = await apiHelper.login(username, password);
        localStorageSrv.set('accessToken', accessToken);

        dispatch({
            type: LOGIN_COMPLETE,
            accessToken
        });

        return true;
    },

    errorType: LOGIN_ERROR
});