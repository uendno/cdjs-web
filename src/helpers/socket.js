import io from 'socket.io-client';
import config from '../config';
import {UPDATE_JOB_BUILD_DATA} from '../actions/types';

const BUILD_STATUS = 'BUILD_STATUS';

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
    })
};