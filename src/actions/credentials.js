import {
    GET_ALL_CREDENTIALS_REQUEST,
    GET_ALL_CREDENTIALS_COMPLETE,
    GET_ALL_CREDENTIALS_ERROR,
    CREATE_CREDENTIAL_REQUEST,
    EDIT_CREDENTIAL_CLOSE,
    CREATE_CREDENTIAL_COMPLETE,
    CREATE_CREDENTIAL_ERROR,
    EDIT_CREDENTIAL_START,
    UPDATE_BEING_EDITED_CREDENTIAL,
    CHECK_CREDENTIAL_NAME_REQUEST,
    CHECK_CREDENTIAL_NAME_COMPLETE,
    CHECK_CREDENTIAL_NAME_ERROR,
    DELETE_CREDENTIAL_REQUEST,
    DELETE_CREDENTIAL_COMPLETE,
    DELETE_CREDENTIAL_ERROR,
    UPDATE_CREDENTIAL_COMPLETE,
    UPDATE_CREDENTIAL_ERROR,
    UPDATE_CREDENTIAL_REQUEST
} from './types';
import * as credentialsApi from '../api/credentials';

export const requestAllCredentials = async () => ({
    func: async (dispatch) => {
        dispatch({
            type: GET_ALL_CREDENTIALS_REQUEST
        });

        const credentials = await credentialsApi.getAllCredentials();

        dispatch({
            type: GET_ALL_CREDENTIALS_COMPLETE,
            credentials
        });

        return credentials;
    },

    errorType: GET_ALL_CREDENTIALS_ERROR
});

export const openCreateCredentialModal = (mode, credential) => {
    return {
        type: EDIT_CREDENTIAL_START,
        mode,
        credential
    }
};

export const closeCreateCredentialModal = () => {
    return {
        type: EDIT_CREDENTIAL_CLOSE
    }
};

export const updateBeingEditedCredential = (data) => {
    return {
        type: UPDATE_BEING_EDITED_CREDENTIAL,
        data
    }
};

export const checkCredentialName = async (name, currentCredentialId) => ({
    func: async (dispatch) => {
        dispatch({
            type: CHECK_CREDENTIAL_NAME_REQUEST,
            name,
            currentCredentialId
        });

        const result = await credentialsApi.validateName(currentCredentialId, name);

        dispatch({
            type: CHECK_CREDENTIAL_NAME_COMPLETE,
            result
        });

        return result;
    },

    errorType: CHECK_CREDENTIAL_NAME_ERROR
});

export const requestCreateCredential = async (name, type, data) => ({
    func: async (dispatch) => {
        dispatch({
            type: CREATE_CREDENTIAL_REQUEST,
            data: {
                type,
                name,
                data
            }
        });

        let credential;

        credential = await credentialsApi.createCredential({
            type,
            name,
            data
        });

        dispatch({
            type: CREATE_CREDENTIAL_COMPLETE,
            credential,
        });

        return credential;
    },

    errorType: CREATE_CREDENTIAL_ERROR
});

export const requestUpdateCredential = async (id, updateData) => ({
    func: async (dispatch) => {
        dispatch({
            type: UPDATE_CREDENTIAL_REQUEST,
            id,
            updateData
        });

        const credential = await credentialsApi.updateCredential(id, updateData);

        dispatch({
            type: UPDATE_CREDENTIAL_COMPLETE,
            credential,
            id
        });

        return credential;
    },

    errorType: UPDATE_CREDENTIAL_ERROR
});

export const deleteCredential = async (id) => ({
    func: async (dispatch) => {
        dispatch({
            type: DELETE_CREDENTIAL_REQUEST,
            id
        });

        await credentialsApi.deleteCredential(id);

        dispatch({
            type: DELETE_CREDENTIAL_COMPLETE,
            id
        })
    },

    errorType: DELETE_CREDENTIAL_ERROR
});