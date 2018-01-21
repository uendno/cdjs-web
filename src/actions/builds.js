import {
    GET_BUILD_DETAILS_REQUEST,
    GET_BUILD_DETAILS_COMPLETE,
    GET_BUILD_DETAILS_ERROR,
    READ_LOG,
    CANCEL_READ_LOG,
    CREATE_BUILD_REQUEST,
    CREATE_BUILD_COMPLETE,
    CREATE_BUILD_ERROR
} from './types';
import * as buildsApi from '../api/builds';
import * as socketSrv from '../services/socket';

export const getBuildDetails = async (id, jobId) => ({
    func: async (dispatch) => {
        dispatch({
            type: GET_BUILD_DETAILS_REQUEST,
            id
        });

        const build = await buildsApi.getBuildDetails(id);

        dispatch({
            type: GET_BUILD_DETAILS_COMPLETE,
            jobId,
            build
        });

        return build;
    },

    errorType: GET_BUILD_DETAILS_ERROR
});

export const readLogs = (buildId) => {

    socketSrv.startReadLogs(buildId);

    return {
        type: READ_LOG,
        buildId
    }
};

export const cancelReadLogs = () => {

    socketSrv.cancelReadLogs();

    return {
        type: CANCEL_READ_LOG
    }
};

export const requestCreateBuild = async (jobId) => ({
    func: async (dispatch) => {
        dispatch({
            type: CREATE_BUILD_REQUEST,
            jobId
        });

        const build = await buildsApi.createBuild(jobId);

        dispatch({
            type: CREATE_BUILD_COMPLETE,
            build,
            jobId
        });

        return build;
    },

    errorType: CREATE_BUILD_ERROR
});