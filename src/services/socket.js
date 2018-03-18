import io from 'socket.io-client';
import config from '../config';
import {editAgentImmediately} from '../actions/agents';
import {UPDATE_JOB_BUILD_DATA, RECEIVE_LOG, CREATE_BUILD, CREATE_BUILD_COMPLETE} from '../constants/actions';
import {getCurrentBuildIdThatBeingReadLogs} from '../reducers/index';

const BUILD_STATUS = 'BUILD_STATUS';
const LOG_DATA = 'LOG_DATA';
const READ_LOG = 'READ_LOG';
const CANCEL_READ_LOG = 'CANCEL_READ_LOG';
const NEW_BUILD = 'NEW_BUILD';
const AGENT_STATUS = 'AGENT_STATUS';

let socket;

export const createWS = (dispatch, getState) => {
  socket = io.connect(config.api.socketNamespace, {path: '/api/socket.io'});

  socket.on('connect', () => {
    console.log('Connected');
  });

  socket.on(BUILD_STATUS, (data) => {
    dispatch({
      type: UPDATE_JOB_BUILD_DATA,
      data: {
        ...data.build,
      },
    });
  });

  socket.on(NEW_BUILD, (data) => {
    dispatch({type: CREATE_BUILD_COMPLETE, data: data.build});
  });

  socket.on(LOG_DATA, (data) => {
    const state = getState();
    const currentBuildId = getCurrentBuildIdThatBeingReadLogs(state);

    if (currentBuildId === data.buildId) {
      dispatch({type: RECEIVE_LOG, logs: data.data});
    }
  });

  socket.on(AGENT_STATUS, (agent) => {
    dispatch(editAgentImmediately(agent._id, {
      ...agent,
    }));
  });
};

export const startReadLogs = (buildId) => {
  socket.emit(READ_LOG, buildId);
};

export const cancelReadLogs = () => {
  socket.emit(CANCEL_READ_LOG);
};