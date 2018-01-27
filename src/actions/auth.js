import {LOGIN} from './types';
import localStorageSrv from '../services/localStorage';
import {post} from '../helpers/api';

export const login = async(email, password) => ({
  type: LOGIN,
  func: () => {
    const response = post('/auth', {
      email,
      password,
    });

    const accessToken = response.data;
    localStorageSrv.set('accessToken', accessToken);

    return response;
  },
});

export const logout = async() => ({});