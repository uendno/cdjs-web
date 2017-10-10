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
import {
    getAllCredentials as getAllCredentialsQL,
    checkCredentialName as checkCredentialNameQL,
    createCredential as createCredentialQL,
    deleteCredential as deleteCredentialQL,
    updateCredential as updateCredentialQL,
} from '../helpers/api';
import {showError} from '../helpers/alert';

export const requestAllCredentials = async () => async (dispatch) =>    {
    dispatch({
        type: GET_ALL_CREDENTIALS_REQUEST
    });

    try {
        const credentials = await getAllCredentialsQL();

        dispatch({
            type: GET_ALL_CREDENTIALS_COMPLETE,
            credentials
        });

        return credentials;

    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);

        dispatch({
            type: GET_ALL_CREDENTIALS_ERROR,
            error
        });
    }
};

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

export const checkCredentialName = async (name, currentCredentialId) => async (dispatch) => {
    dispatch({
        type: CHECK_CREDENTIAL_NAME_REQUEST,
        name,
        currentCredentialId
    });

    try {
        const result = await checkCredentialNameQL(name, currentCredentialId);

        dispatch({
            type: CHECK_CREDENTIAL_NAME_COMPLETE,
            result
        });

        return result;
    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);

        dispatch({
            type: CHECK_CREDENTIAL_NAME_ERROR,
            error
        });
    }
};

export const requestCreateCredential = async (name, type, data) => async (dispatch) => {
    dispatch({
        type: CREATE_CREDENTIAL_REQUEST,
        credentialType: type,
        name,
        data
    });

    try {

        let credential;

        credential = await createCredentialQL(name, type, data);

        dispatch({
            type: CREATE_CREDENTIAL_COMPLETE,
            credential,
        });

        return credential;
    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);

        dispatch({
            type: CREATE_CREDENTIAL_ERROR,
            error
        });
    }
};

export const requestUpdateCredential = async (id, updateData) => async (dispatch) => {
    dispatch({
        type: UPDATE_CREDENTIAL_REQUEST,
        id,
        updateData
    });

    try {
        const credential = await updateCredentialQL(id, updateData);

        dispatch({
            type: UPDATE_CREDENTIAL_COMPLETE,
            credential,
            id
        });

        return credential;
    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);

        dispatch({
            type: UPDATE_CREDENTIAL_ERROR,
            error
        });
    }
};

export const deleteCredential = async (id) => async (dispatch) => {
    dispatch({
        type: DELETE_CREDENTIAL_REQUEST,
        id
    });

    try {
        await deleteCredentialQL(id);

        dispatch({
            type: DELETE_CREDENTIAL_COMPLETE,
            id
        })
    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);

        dispatch({
            type: DELETE_CREDENTIAL_ERROR,
            error
        });
    }
};