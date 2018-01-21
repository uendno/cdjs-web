import isGitUrl from 'is-git-url';
import {
    GET_ALL_JOBS_REQUEST,
    GET_ALL_JOBS_COMPLETE,
    GET_ALL_JOBS_ERROR,
    CREATE_JOB_REQUEST,
    UPDATE_BEING_EDITED_JOB,
    UPDATE_EDIT_JOB_MODAL_DATA,
    CREATE_JOB_COMPLETE,
    CREATE_JOB_ERROR,
    CHECK_JOB_NAME_REQUEST,
    CHECK_JOB_NAME_COMPLETE,
    CHECK_JOB_NAME_ERROR,
    GET_JOB_DETAILS_COMPLETE,
    GET_JOB_DETAILS_REQUEST,
    GET_JOB_DETAILS_ERROR,
    UPDATE_JOB_ERROR,
    DELETE_JOB_REQUEST,
    DELETE_JOB_COMPLETE,
    DELETE_JOB_ERROR,
    SHOW_CREATE_JOB_MODAL, HIDE_CREATE_JOB_MODAL, UPDATE_JOB_REQUEST, UPDATE_JOB_COMPLETE
} from './types';
import * as jobsApi from '../api/jobs';

import {getDataForJobNameComponent, getEditJobData} from '../reducers';

export const requestAllJobs = async () => ({
    func: async (dispatch) => {

        dispatch({
            type: GET_ALL_JOBS_REQUEST
        });

        const jobs = await jobsApi.getAllJobs();
        dispatch({
            type: GET_ALL_JOBS_COMPLETE,
            jobs
        })
    },

    errorType: GET_ALL_JOBS_ERROR
});

export const checkJobName = (name, jobId) => ({
    func: async (dispatch) => {
        dispatch({
            type: CHECK_JOB_NAME_REQUEST,
            name
        });

        const result = await jobsApi.validateName(jobId, name);

        dispatch({
            type: CHECK_JOB_NAME_COMPLETE,
            result
        });

        return result;
    },

    errorType: CHECK_JOB_NAME_ERROR
});

export const updateBeingEditedJob = (data) => {
    return {
        type: UPDATE_BEING_EDITED_JOB,
        data
    }
};

export const updateEditJobModalData = (data) => {
    return {
        type: UPDATE_EDIT_JOB_MODAL_DATA,
        data
    }
};

export const showCreateJobModal = () => {
    return {
        type: SHOW_CREATE_JOB_MODAL
    }
};

export const saveBeingEditedJob = async () => async (dispatch, getState) => {

    const _validate = (name, repoUrl) => {
        let messages = {};

        if (!name || name.trim() === "") {
            messages.invalidNameMessage = "Job name must not be null"
        }

        if (!repoUrl || repoUrl.trim() === "") {
            messages.invalidRepoUrlMessage = "Repo URL must not be null";
        } else if (!isGitUrl(repoUrl)) {
            messages.invalidRepoUrlMessage = "Invalid git repo URL";
        }

        return messages;
    };


    const state = getState();
    const data = getEditJobData(state);

    const {_id, name, repoUrl, repoType, branch, credential, cdFilePath, description} = data;

    const messages = _validate(name, repoUrl);

    if (Object.keys(messages).length > 0) {
        dispatch(updateEditJobModalData(messages));
    } else {
        dispatch(updateEditJobModalData({
            loading: true
        }));

        const newJob = await dispatch(requestUpdateJob(_id, {
            name,
            repoType,
            repoUrl,
            branch,
            credential,
            description,
            cdFilePath
        }));

        dispatch(updateEditJobModalData({
            loading: false
        }));

        return newJob;
    }
};

export const hideCreateJobModal = () => {
    return {
        type: HIDE_CREATE_JOB_MODAL
    }
};

export const requestCreateJob = async () => ({
    func: async (dispatch, getState) => {
        const state = getState();
        const {name} = getDataForJobNameComponent(state);

        dispatch({
            type: CREATE_JOB_REQUEST,
            name
        });

        const createdJob = await jobsApi.createJob({
            name
        });

        dispatch({
            type: CREATE_JOB_COMPLETE,
            job: createdJob
        });

        return createdJob;
    },

    errorType: CREATE_JOB_ERROR
});

export const requestUpdateJob = async (id, data) => ({
    func: async (dispatch) => {
        dispatch({
            type: UPDATE_JOB_REQUEST,
            id,
            data
        });

        const newJob = await jobsApi.updateJob(id, data);

        dispatch({
            type: UPDATE_JOB_COMPLETE,
            job: newJob
        });

        return newJob;
    },

    errorType: UPDATE_JOB_ERROR
});

export const requestDeleteJob = async (id) => ({
    func: async (dispatch) => {
        dispatch({
            type: DELETE_JOB_REQUEST,
            id
        });

        await jobsApi.deleteJob(id);

        dispatch({
            type: DELETE_JOB_COMPLETE,
            id
        });

        return true;
    },

    errorType: DELETE_JOB_ERROR
});

export const requestJobDetails = async (id) => ({
    func: async (dispatch) => {
        dispatch({
            type: GET_JOB_DETAILS_REQUEST,
            id
        });

        const job = await jobsApi.getJobDetails(id);

        dispatch({
            type: GET_JOB_DETAILS_COMPLETE,
            job
        });

        return job;
    },

    errorType: GET_JOB_DETAILS_ERROR
});