import {GET_JOB_DETAILS_COMPLETE, GET_JOB_DETAILS_REQUEST} from '../actions/types';

const initialState = {
    stages: []
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

        default:
            return state;
    }
}