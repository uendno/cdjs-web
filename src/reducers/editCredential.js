import {
    EDIT_CREDENTIAL_START, EDIT_CREDENTIAL_CLOSE, UPDATE_BEING_EDITED_CREDENTIAL,
} from '../actions/types';

const initialState = {
    _id: null,
    invalidNameMessage: "",
    name: "",
    type: "username/password",
    data: {},
    loading: false,
    mode: 'create'
};

const editCredentialModal = (state = initialState, action) => {
    switch (action.type) {

        case EDIT_CREDENTIAL_START: {

            if (action.credential) {
                return {
                    ...initialState,
                    ...action.credential,
                    show:true,
                    mode: action.mode
                }
            } else {
                return {
                    ...initialState,
                    ...state,
                    show: true,
                    mode: action.mode
                }
            }
        }

        case EDIT_CREDENTIAL_CLOSE: {
            return {...initialState}
        }

        case UPDATE_BEING_EDITED_CREDENTIAL: {
            return {
                ...state,
                ...action.data
            }
        }

        default:
            return state;
    }
};

export default editCredentialModal;