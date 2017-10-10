import {combineReducers} from 'redux';
import jobs, * as fromJobs from './jobs';
import credentials, * as fromCredentials from './credentials';
import editCredentialModal, * as fromEditCredentialData from './editCredentialModal';
import editJobScreen, * as fromEditJobScreen from './editJobScreen';
import currentJob from './currentJob';

const app = combineReducers({
    jobs,
    credentials,
    editCredentialModal,
    editJobScreen,
    currentJob
});

export default app;

export const getAllJobs = (state) => fromJobs.getAllJobs(state.jobs);

export const getCredentials = (state) => fromCredentials.getCredentials(state.credentials);

export const getEditCredentialModalData = (state) => state.editCredentialModal;

export const getEditJobScreen = (state) => state.editJobScreen;

export const getCurrentJobDetails = (state) => state.currentJob;