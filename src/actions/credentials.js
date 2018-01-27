import {
  GET_ALL_CREDENTIALS,
  CREATE_CREDENTIAL,
  EDIT_CREDENTIAL_CLOSE,
  EDIT_CREDENTIAL_START,
  UPDATE_BEING_EDITED_CREDENTIAL,
  CHECK_CREDENTIAL_NAME,
  DELETE_CREDENTIAL,
  UPDATE_CREDENTIAL,
} from './types';
import {get, post, put, del} from '../helpers/api';

export const requestAllCredentials = async() => ({
  type: GET_ALL_CREDENTIALS,
  func: () => get('/credentials'),
});

export const openCreateCredentialModal = (mode, credential) => ({type: EDIT_CREDENTIAL_START, mode, credential});

export const closeCreateCredentialModal = () => ({type: EDIT_CREDENTIAL_CLOSE});

export const updateBeingEditedCredential = data => ({type: UPDATE_BEING_EDITED_CREDENTIAL, data});

export const checkCredentialName = (name, currentCredentialId) => ({
  type: CHECK_CREDENTIAL_NAME,
  func: () => post('/name-validations', {
    currentId: currentCredentialId,
    name,
    collection: 'credentials',
  }),
});

export const requestCreateCredential = (name, type, data) => ({
  type: CREATE_CREDENTIAL,
  func: () => post('/credentials', {
    type,
    name,
    data,
  }),
});

export const requestUpdateCredential = (id, updateData) => ({
  type: UPDATE_CREDENTIAL,
  func: () => put(`/credentials/${id}`, updateData),
});

export const deleteCredential = id => ({
  type: DELETE_CREDENTIAL,
  func: () => del(`/credentials/${id}`),
  identity: id,
});