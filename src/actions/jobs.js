import {
    GET_ALL_JOBS_REQUEST,
    GET_ALL_JOBS_COMPLETE,
    GET_ALL_JOBS_ERROR,
    CREATE_JOB_REQUEST,
    UPDATE_BEING_EDITED_JOB,
    CREATE_JOB_COMPLETE,
    CREATE_JOB_ERROR,
    CHECK_JOB_NAME_REQUEST,
    CHECK_JOB_NAME_COMPLETE,
    CHECK_JOB_NAME_ERROR,
    PLAY_JOB_REQUEST,
    PLAY_JOB_COMPLETE,
    PLAY_JOB_ERROR,
    GET_JOB_DETAILS_COMPLETE,
    GET_JOB_DETAILS_REQUEST,
    GET_JOB_DETAILS_ERROR
} from './types';
import {
    getAllJobs as getAllJobQL,
    createJob as createJobQL,
    checkJobName as checkJobNameQL,
    play,
    jobDetails
} from '../helpers/api';
import {showError} from '../helpers/alert';

export const requestAllJobs = async () => async (dispatch) => {

    dispatch({
        type: GET_ALL_JOBS_REQUEST
    });

    try {
        const jobs = await getAllJobQL();
        dispatch({
            type: GET_ALL_JOBS_COMPLETE,
            jobs
        });
    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);

        dispatch({
            type: GET_ALL_JOBS_ERROR,
            error
        });
    }
};

export const checkJobName = (name) => async (dispatch) => {
    dispatch({
        type: CHECK_JOB_NAME_REQUEST,
        name
    });

    try {
        const result = await checkJobNameQL(name);

        dispatch({
            type: CHECK_JOB_NAME_COMPLETE,
            result
        });

        return result;
    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);

        dispatch({
            type: CHECK_JOB_NAME_ERROR,
            error
        });
    }
};

export const updateBeingEditedJob = (data) => {
    return {
        type: UPDATE_BEING_EDITED_JOB,
        data
    }
};

export const requestCreatingJob = async (name, repoType, repoUrl, branch, credentialId, description, secret, cdFilePath) => async (dispatch) => {
    dispatch({
        type: CREATE_JOB_REQUEST,
        name,
        repoType,
        repoUrl,
        branch,
        credentialId,
        description,
        secret,
        cdFilePath
    });

    try {
        const newJob = await createJobQL(name, repoType, repoUrl, branch, credentialId, description, secret, cdFilePath);

        dispatch({
            type: CREATE_JOB_COMPLETE,
            job: newJob
        });

        return newJob;
    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);

        dispatch({
            type: CREATE_JOB_ERROR,
            error
        });
    }
};

export const requestPlayJob = async (id) => async (dispatch) => {
    dispatch({
        type: PLAY_JOB_REQUEST,
        id
    });

    try {
        const buildId = await play(id);

        dispatch({
            type: PLAY_JOB_COMPLETE,
            buildId
        });

        return buildId;
    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);

        dispatch({
            type: PLAY_JOB_ERROR,
            error
        });
    }
};

export const requestJobDetails = async (id) => async (dispatch) => {
    dispatch({
        type: GET_JOB_DETAILS_REQUEST,
        id
    });

    try {
        const job = await jobDetails(id);

        dispatch({
            type: GET_JOB_DETAILS_COMPLETE,
            job
        });

        return job;
    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);

        dispatch({
            type: GET_JOB_DETAILS_ERROR,
            error
        });
    }
};