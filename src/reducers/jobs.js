import {
    CREATE_JOB_REQUEST,
    CREATE_JOB_CANCEL,
    CREATE_JOB_COMPLETE,
    CREATE_JOB_START,
    CREATE_JOB_ERROR
} from '../actions/types';


const jobs = (state = {
    byId: {},
    ids: [],
    beingCreatedJob: null
}, action) => {
    switch (action.type) {
        case CREATE_JOB_START: {
            return {
                ...state,
                beingCreatedJob: {
                    accountId: action.accountId,
                    repo: action.repo
                }
            }
        }

        case CREATE_JOB_COMPLETE:
        case CREATE_JOB_CANCEL: {
            return {
                ...state,
                beingCreatedJob: null
            }
        }

        default:
            return state;
    }
};

export default jobs;

export const getBeingCreatedJob = (state) => state.beingCreatedJob;

export const getAllJobs = (state) => {
    return state.ids.map(id => state.byId[id]);
};