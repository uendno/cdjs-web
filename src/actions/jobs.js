import {
    GET_ALL_JOBS_REQUEST,
    GET_ALL_JOBS_COMPLETE,
    GET_ALL_JOBS_ERROR,
    CREATE_JOB_REQUEST,
    UPDATE_BEING_EDITED_JOB,
    UPDATE_EDIT_JOB_FORM_DATA,
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
    GET_JOB_DETAILS_ERROR,
    UPDATE_JOB_ERROR,
    DELETE_JOB_REQUEST,
    DELETE_JOB_COMPLETE,
    DELETE_JOB_ERROR,
    UPDATE_JOB_BUILD_DATA,
    SHOW_CREATE_JOB_MODAL, HIDE_CREATE_JOB_MODAL, UPDATE_JOB_REQUEST, UPDATE_JOB_COMPLETE
} from './types';
import {
    getAllJobs as getAllJobQL,
    updateJob,
    checkJobName as checkJobNameQL,
    play,
    jobDetails,
    createJob,
    deleteJob
} from '../helpers/api';
import {showError} from '../helpers/alert';
import {getDataForJobNameComponent} from '../reducers';

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

export const checkJobName = (name, jobId) => async (dispatch) => {
    dispatch({
        type: CHECK_JOB_NAME_REQUEST,
        name
    });

    try {
        const result = await checkJobNameQL(name, jobId);

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

export const updateEditJobFormData = (data) => {
    return {
        type: UPDATE_EDIT_JOB_FORM_DATA,
        data
    }
};

export const showCreateJobModal = () => {
    return {
        type: SHOW_CREATE_JOB_MODAL
    }
};

export const hideCreateJobModal = () => {
    return {
        type: HIDE_CREATE_JOB_MODAL
    }
};

export const requestCreateJob = async () => async (dispatch, getState) => {
    const state = getState();
    const {name} = getDataForJobNameComponent(state);

    dispatch({
        type: CREATE_JOB_REQUEST,
        name
    });

    try {
        const createdJob = await createJob(name);

        dispatch({
            type: CREATE_JOB_COMPLETE,
            job: createdJob
        });

        return createdJob;

    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);

        dispatch({
            type: CREATE_JOB_ERROR,
            error
        });
    }

};

export const requestUpdateJob = async (id, name, repoType, repoUrl, branch, credential, description, cdFilePath) => async (dispatch) => {
    dispatch({
        type: UPDATE_JOB_REQUEST,
        id,
        name,
        repoType,
        repoUrl,
        branch,
        credential,
        description,
        cdFilePath
    });

    try {
        const newJob = await updateJob(id, name, repoType, repoUrl, branch, credential, description, cdFilePath);

        dispatch({
            type: UPDATE_JOB_COMPLETE,
            job: newJob
        });

        return newJob;
    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);

        dispatch({
            type: UPDATE_JOB_ERROR,
            error
        });
    }
};

export const requestDeleteJob = async (id) => async (dispatch) => {
    dispatch({
        type: DELETE_JOB_REQUEST,
        id
    });

    try {
        await deleteJob(id);

        dispatch({
            type: DELETE_JOB_COMPLETE,
            id
        });

        return true;

    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);

        dispatch({
            type: DELETE_JOB_ERROR,
            error
        });

        return false;
    }
};

export const requestPlayJob = async (id) => async (dispatch) => {
    dispatch({
        type: PLAY_JOB_REQUEST,
        id
    });

    try {
        const build = await play(id);

        dispatch({
            type: PLAY_JOB_COMPLETE,
            build,
            jobId: id
        });

        return build;
    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);

        dispatch({
            type: PLAY_JOB_ERROR,
            error
        });
    }
};

export const requestJobDetails = async (id, includeBuilds) => async (dispatch) => {
    dispatch({
        type: GET_JOB_DETAILS_REQUEST,
        id
    });

    try {
        const job = await jobDetails(id, includeBuilds);

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