import {UPDATE_BEING_EDITED_JOB, EDIT_JOB_START, EDIT_JOB_CLOSE} from '../actions/types';

const initialState = {
    invalidNameMessage: "",
    invalidRepoUrlMessage: "",
    loading: false,
    name: "",
    webhookUrl: "",
    repoType: "github",
    branch: "master",
    cdFile: "cd.js",
    description: "",
    repoUrl: "",
    credentialId: null,
    mode: 'create'
};

const editJobScreen = (state = initialState, action) => {
    switch (action.type) {

        case EDIT_JOB_START: {

            if (action.job) {
                return {
                    ...initialState,
                    ...action.job,
                    mode: action.mode
                }
            } else {
                return {
                    ...initialState,
                    mode: action.mode
                }
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

        default:
            return state;
    }
};

export default editJobScreen;

