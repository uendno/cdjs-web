import {
    GET_BUILD_DETAILS_REQUEST,
    GET_BUILD_DETAILS_COMPLETE,
    GET_BUILD_DETAILS_ERROR,
    READ_LOG,
    CANCEL_READ_LOG,
    CREATE_BUILD_REQUEST,
    CREATE_BUILD_COMPLETE,
    CREATE_BUILD_ERROR,
    GET_FILES_COMPLETE,
    GET_FILES_ERROR,
    GET_FILES_REQUEST
} from './types';
import * as buildsApi from '../api/builds';
import * as socketSrv from '../services/socket';

export const getBuildDetails = async (id) => ({
    func: async (dispatch) => {
        dispatch({
            type: GET_BUILD_DETAILS_REQUEST,
            id
        });

        const build = await buildsApi.getBuildDetails(id);

        dispatch({
            type: GET_BUILD_DETAILS_COMPLETE,
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

export const requestFileList = async (buildId) => ({
    func: async (dispatch) => {
        dispatch({
            type: GET_FILES_REQUEST,
            buildId
        });

        const tree = await buildsApi.getFileList(buildId);

        dispatch({
            type: GET_FILES_COMPLETE,
            tree
        });

        return tree;
    },

    errorType: GET_FILES_ERROR
});