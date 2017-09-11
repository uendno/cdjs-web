import {
    CREATE_JOB_CANCEL,
    CREATE_JOB_COMPLETE,
    CREATE_JOB_START,
    GET_BRANCHES_FOR_REPO_COMPLETE,
    SELECT_BRANCH
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
                    repo: {
                        ...action.repo,
                        branch: "master",
                    },
                    branches: []
                }
            }
        }

        case GET_BRANCHES_FOR_REPO_COMPLETE: {
            return {
                ...state,
                beingCreatedJob: {
                    ...state.beingCreatedJob,
                    branches: action.branches
                }
            }
        }

        case SELECT_BRANCH: {
            return {
                ...state,
                beingCreatedJob: {
                    ...state.beingCreatedJob,
                    repo: {
                        ...state.beingCreatedJob.repo,
                        branch: action.branch
                    }
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