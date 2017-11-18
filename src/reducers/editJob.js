import {
    GET_JOB_DETAILS_COMPLETE,
    GET_JOB_DETAILS_REQUEST,
    CREATE_BUILD,
    UPDATE_JOB_BUILD_DATA,
    UPDATE_BEING_EDITED_JOB,
    EDIT_JOB_START,
    EDIT_JOB_CLOSE,
    SHOW_CREATE_JOB_MODAL,
    HIDE_CREATE_JOB_MODAL,
    UPDATE_EDIT_JOB_FORM_DATA
} from '../actions/types';

const initialState = {
    _id: null,
    editForm: {
        invalidNameMessage: "",
        invalidRepoUrlMessage: "",
        loading: false,
        showCreateJobModal: false
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_JOB_DETAILS_REQUEST: {
            return {
                ...initialState
            }
        }

        case GET_JOB_DETAILS_COMPLETE: {
            return {
                ...state,
                ...action.job
            }
        }


        case EDIT_JOB_START: {

            return {
                ...initialState,
                ...action.job,
            }
        }

        case EDIT_JOB_CLOSE: {
            return {...initialState}
        }

        case UPDATE_BEING_EDITED_JOB: {
            return {
                ...state,
                ...action.data
            }
        }

        case UPDATE_EDIT_JOB_FORM_DATA: {
            return {
                ...state,
                editForm: {
                    ...state.editForm,
                    ...action.data
                }
            }
        }

        case SHOW_CREATE_JOB_MODAL: {
            return {
                ...initialState,
                editForm: {
                    ...state.editForm,
                    showCreateJobModal: true
                }
            }
        }

        case HIDE_CREATE_JOB_MODAL: {
            return {
                ...initialState
            }
        }


        default:
            return state;
    }
}

export const getDataForJobNameForm = ({editForm, name, _id}) => {
    return {
        invalidNameMessage: editForm.invalidNameMessage,
        name,
        _id
    }
};

export const checkIfShouldShowCreateJobModal = ({editForm}) => {
    return editForm.showCreateJobModal;
};

export const checkIfNewJobAbleToBeCreated = ({editForm}) => {
    return !editForm.loading && editForm.invalidNameMessage === "" && editForm.invalidRepoUrlMessage === "";
};