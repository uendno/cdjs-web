import {LOGIN, LOGOUT} from '../constants/actions';
import localStorageSrv from '../services/localStorage';
import {post, del} from '../helpers/api';

export const login = async(email, password) => ({
  type: LOGIN,
  func: async () => {
    const response = await post('/auth', {email, password});

    const accessToken = response.data;
    localStorageSrv.set('accessToken', accessToken);

    return response;
  },
});

export const logout = async() => ({
  type: LOGOUT,
  func: async () => {
    await del('/auth');
    localStorageSrv.remove('accessToken');
  },
});