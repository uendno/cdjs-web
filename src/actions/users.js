import {
  GET_ALL_USERS,
  GET_USER_PERMISSIONS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  OPEN_EDIT_USER_MODAL,
  CLOSE_EDIT_USER_MODAL,
  UPDATE_BEING_EDITED_USER,
  CHECK_USER_EMAIL,
} from '../constants/actions';
import {get, post, put, del} from '../helpers/api';

export const requestAllUsers = () => ({
  type: GET_ALL_USERS,
  func: () => get('/users'),
});

export const checkUserEmail = (name, userId) => ({
  type: CHECK_USER_EMAIL,
  func: () => post('/name-validations', {
    currentId: userId,
    name,
    collection: 'users',
  }),
});

export const requestUserPermissions = userId => ({
  type: GET_USER_PERMISSIONS,
  func: () => get(`/users/${userId}/permissions`),
});

export const requestCreateUser = data => ({
  type: CREATE_USER,
  func: () => post('/users', data),
});

export const requestUpdateUser = (userId, data) => ({
  type: UPDATE_USER,
  func: () => put(`/users/${userId}`, data),
});

export const requestDeleteUser = userId => ({
  type: DELETE_USER,
  func: () => del(`/users/${userId}`),

});

export const openAddUserModal = () => ({type: OPEN_EDIT_USER_MODAL, mode: 'add'});

export const openEditUserModal = (userId, email, role) => ({type: OPEN_EDIT_USER_MODAL, mode: 'edit', userId, email, role});

export const closeEditUserModal = () => ({type: CLOSE_EDIT_USER_MODAL});

export const updateBeingEditedUser = data => ({
  type: UPDATE_BEING_EDITED_USER,
  data,
});