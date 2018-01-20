import {combineReducers} from 'redux';
import jobs, * as fromJobs from './jobs';
import credentials, * as fromCredentials from './credentials';
import editCredentialModal, * as fromEditCredentialData from './editCredential';
import editJob, * as fromEditJob from './editJob';
import currentBuildLogs, * as fromCurrentBuildLogs from './currentBuildLogs';
import builds, * as fromBuilds from './builds';
import auth, * as fromAuth from './auth';
import agents, * as fromAgents from './agents';
import editAgent, * as fromEditAgent from './editAgent';


const app = combineReducers({
    jobs,
    builds,
    credentials,
    editCredentialModal,
    editJob,
    currentBuildLogs,
    auth,
    agents,
    editAgent
});

export default app;


// auth

export const getAccessToken = (state) => fromAuth.getAccessToken(state.auth);


// jobs

export const getAllJobs = (state) => fromJobs.getAllJobs(state.jobs)
    .map(job => {
        return {
            ...job,
            lastBuild: getBuild(state, job.lastBuild)
        }
    });

export const getJob = (state, id) => fromJobs.getJob(state.jobs, id);

export const getDataForJobNameComponent = (state) => fromEditJob.getDataForJobNameForm(state.editJob);

export const checkIfNewJobAbleToBeCreated = (state) => fromEditJob.checkIfNewJobAbleToBeCreated(state.editJob);

export const checkIfShouldShowCreateJobModal = (state) => fromEditJob.checkIfShouldShowCreateJobModal(state.editJob);

export const getBeingEditedJobName = (state) => fromEditJob.getBeingEditedJobName(state.editJob);

export const getBeingEditedJobId = (state) => fromEditJob.getBeingEditedJobId(state.editJob);

export const getEditJobData = (state) => state.editJob;

export const getModalDataForBeingEditedJob = (state) => fromEditJob.getModalData(state.editJob);


// builds

export const getBuildsForJob = (state, jobId) => fromBuilds.getBuildsForJob(state.builds, jobId);

export const getBuild = (state, buildId) => fromBuilds.getBuild(state.builds, buildId);

export const getCurrentBuildLogs = (state) => fromCurrentBuildLogs.getLogs(state.currentBuildLogs);

export const getCurrentBuildIdThatBeingReadLogs = (state) => fromCurrentBuildLogs.getCurrentBuildId(state.currentBuildLogs);


// credentials

export const getCredentials = (state) => fromCredentials.getCredentials(state.credentials);

export const getEditCredentialModalData = (state) => state.editCredentialModal;


// agents

export const getAllAgents = (state) => fromAgents.getAllAgents(state.agents);

export const getAgentById = (state, id) => fromAgents.getAgentById(state.agents, id);

export const getEditAgentData = (state) => state.editAgent;

export const getDataForEditAgentNameFormComponent = (state) => fromEditAgent.getDataForEditNameForm(state.editAgent);