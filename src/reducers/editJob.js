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
    UPDATE_EDIT_JOB_MODAL_DATA
} from '../actions/types';

const initialState = {
    _id: null,
    modal: {
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

        case UPDATE_EDIT_JOB_MODAL_DATA: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...action.data
                }
            }
        }

        case SHOW_CREATE_JOB_MODAL: {
            return {
                ...initialState,
                modal: {
                    ...state.modal,
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

export const getModalData = (state) => {
    return state.modal;
};

export const getDataForJobNameForm = ({modal, name, _id}) => {
    return {
        invalidNameMessage: modal.invalidNameMessage,
        name,
        _id
    }
};

export const checkIfShouldShowCreateJobModal = ({modal}) => {
    return modal.showCreateJobModal;
};

export const checkIfNewJobAbleToBeCreated = ({modal}) => {
    return !modal.loading && modal.invalidNameMessage === "" && modal.invalidRepoUrlMessage === "";
};

export const getBeingEditedJobName = (state) => {
    return state.name
};

export const getBeingEditedJobId = (state) => {
    return state._id
};