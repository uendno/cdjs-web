import {
    GET_BUILD_DETAILS_REQUEST,
    GET_BUILD_DETAILS_COMPLETE,
    GET_BUILD_DETAILS_ERROR,
    READ_LOG,
    CANCEL_READ_LOG
} from './types';
import {buildDetails} from '../helpers/graphql';
import * as socketHelper from '../helpers/socket';

export const getBuildDetails = async (id, jobId) => ({
    func: async (dispatch) => {
        dispatch({
            type: GET_BUILD_DETAILS_REQUEST,
            id
        });

        const build = await buildDetails(id);

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

    socketHelper.startReadLogs(buildId);

    return {
        type: READ_LOG,
        buildId
    }
};

export const cancelReadLogs = () => {

    socketHelper.cancelReadLogs();

    return {
        type: CANCEL_READ_LOG
    }
};