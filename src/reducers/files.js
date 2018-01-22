import {
    GET_FILES_REQUEST,
    GET_FILES_COMPLETE
} from '../actions/types';

const initialState = {};

const files = (state = initialState, action) => {
    switch (action.type) {
        case GET_FILES_REQUEST: {
            return {
                ...initialState
            }
        }

        case GET_FILES_COMPLETE: {
            return {
                ...action.tree
            }
        }

        default:
            return state;
    }
};

export default files;