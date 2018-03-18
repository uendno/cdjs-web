import {GET_BUILD_DETAILS, READ_LOG, CANCEL_READ_LOG, CREATE_BUILD, GET_FILES} from '../constants/actions';
import * as socketSrv from '../services/socket';
import {get, post} from '../helpers/api';

export const getBuildDetails = async id => ({
  type: GET_BUILD_DETAILS,
  func: () => get(`/builds/${id}`),
});

export const readLogs = (buildId) => {
  socketSrv.startReadLogs(buildId);

  return {type: READ_LOG, buildId};
};

export const cancelReadLogs = () => {
  socketSrv.cancelReadLogs();

  return {type: CANCEL_READ_LOG};
};

export const requestCreateBuild = async jobId => ({
  type: CREATE_BUILD,
  func: () => post('/builds', {jobId}),
});

export const requestFileList = async buildId => ({
  type: GET_FILES,
  func: () => get(`/builds/${buildId}/files`),
});