import {GET_ALL_USERS, GET_USER_PERMISSIONS} from './types';
import {get} from '../helpers/api';

export const requestAllUsers = () => ({
  type: GET_ALL_USERS,
  func: () => get('/users'),
});

export const requestUserPermissions = userId => ({
  type: GET_USER_PERMISSIONS,
  func: () => get(`/users/${userId}/permissions`),
});