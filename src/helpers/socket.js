import io from 'socket.io-client';
import config from '../config';
import {UPDATE_JOB_BUILD_DATA, RECEIVE_LOG} from '../actions/types';
import {getCurrentBuildIdThatBeingReadLogs} from '../reducers';

const BUILD_STATUS = 'BUILD_STATUS';
const LOG_DATA = 'LOG_DATA';
const READ_LOG = 'READ_LOG';
const CANCEL_READ_LOG = 'CANCEL_READ_LOG';

let socket;

export const createWS = (dispatch, getState) => {
    socket = io.connect(config.api.socketNamespace, {
        path: '/api/socket.io'
    });

    socket.on('connect', () => {
        console.log('Connected');
    });

    socket.on(BUILD_STATUS, (data) => {
        dispatch({
            type: UPDATE_JOB_BUILD_DATA,
            ...data
        })
    });

    socket.on(LOG_DATA, data => {

        const state = getState();
        const currentBuildId = getCurrentBuildIdThatBeingReadLogs(state);

        if (currentBuildId === data.buildId) {
            dispatch({
                type: RECEIVE_LOG,
                logs: data.data
            })
        }
    })
};

export const startReadLogs = (buildId) => {
    socket.emit(READ_LOG, buildId);
};

export const cancelReadLogs = () => {
    socket.emit(CANCEL_READ_LOG);
};