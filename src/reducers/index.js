import {combineReducers} from 'redux';
import jobs, * as fromJobs from './jobs';
import credentials, * as fromCredentials from './credentials';
import editCredentialModal, * as fromEditCredentialData from './editCredential';
import editJob, * as fromEditJob from './editJob';
import currentBuildLogs, * as fromCurrentBuildLogs from './currentBuildLogs';
import builds, * as fromBuilds from './builds';

const app = combineReducers({
    jobs,
    builds,
    credentials,
    editCredentialModal,
    editJob,
    currentBuildLogs
});

export default app;

export const getAllJobs = (state) => fromJobs.getAllJobs(state.jobs)
    .map(job => {
        return {
            ...job,
            lastBuild: getBuild(state, job.lastBuild)
        }
    });

export const getCredentials = (state) => fromCredentials.getCredentials(state.credentials);

export const getEditCredentialModalData = (state) => state.editCredentialModal;

export const getEditJobData = (state) => state.editJob;

export const getJob = (state, id) => fromJobs.getJob(state.jobs, id);

export const getBuildsForJob = (state, jobId) => fromBuilds.getBuildsForJob(state.builds, jobId);

export const getBuild = (state, buildId) => fromBuilds.getBuild(state.builds, buildId);

export const getDataForJobNameComponent = (state) => fromEditJob.getDataForJobNameForm(state.editJob);

export const checkIfNewJobAbleToBeCreated = (state) => fromEditJob.checkIfNewJobAbleToBeCreated(state.editJob);

export const checkIfShouldShowCreateJobModal = (state) => fromEditJob.checkIfShouldShowCreateJobModal(state.editJob);

export const getCurrentBuildLogs = (state) => fromCurrentBuildLogs.getLogs(state.currentBuildLogs);

export const getCurrentBuildIdThatBeingReadLogs = (state) => fromCurrentBuildLogs.getCurrentBuildId(state.currentBuildLogs);