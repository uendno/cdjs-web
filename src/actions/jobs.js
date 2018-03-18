import isGitUrl from 'is-git-url';
import {
  GET_ALL_JOBS,
  CREATE_JOB,
  UPDATE_BEING_EDITED_JOB,
  UPDATE_EDIT_JOB_MODAL_DATA,
  CHECK_JOB_NAME,
  GET_JOB_DETAILS,
  DELETE_JOB,
  SHOW_CREATE_JOB_MODAL,
  HIDE_CREATE_JOB_MODAL,
  UPDATE_JOB,
} from '../constants/actions';
import {get, post, put, del} from '../helpers/api';
import {getDataForJobNameComponent, getEditJobData} from '../reducers';

export const requestUpdateJob = (id, data) => ({
  type: UPDATE_JOB,
  func: () => put(`/jobs/${id}`, data),
});

export const requestAllJobs = () => ({
  type: GET_ALL_JOBS,
  func: () => get('/jobs'),
});

export const checkJobName = (name, jobId) => ({
  type: CHECK_JOB_NAME,
  func: () => post('/name-validations', {
    currentId: jobId,
    name,
    collection: 'jobs',
  }),
});

export const updateBeingEditedJob = data => ({type: UPDATE_BEING_EDITED_JOB, data});

export const updateEditJobModalData = data => ({type: UPDATE_EDIT_JOB_MODAL_DATA, data});

export const showCreateJobModal = () => ({type: SHOW_CREATE_JOB_MODAL});

export const requestCreateJob = () => ({
  type: CREATE_JOB,
  func: async(dispatch, getState) => {
    const state = getState();
    const {name} = getDataForJobNameComponent(state);
    return post('/jobs', {name});
  },
});

export const saveBeingEditedJob = () => async(dispatch, getState) => {
  const _validate = (name, repoUrl) => {
    const messages = {};

    if (!name || name.trim() === '') {
      messages.invalidNameMessage = 'Job name must not be null';
    }

    if (!repoUrl || repoUrl.trim() === '') {
      messages.invalidRepoUrlMessage = 'Repo URL must not be null';
    } else if (!isGitUrl(repoUrl)) {
      messages.invalidRepoUrlMessage = 'Invalid git repo URL';
    }

    return messages;
  };

  const state = getState();
  const data = getEditJobData(state);

  const {
    _id,
    name,
    repoUrl,
    repoType,
    branch,
    credential,
    cdFilePath,
    description,
    agentTags,
  } = data;

  const messages = _validate(name, repoUrl);

  if (Object.keys(messages).length > 0) {
    dispatch(updateEditJobModalData(messages));
    return null;
  }
  dispatch(updateEditJobModalData({loading: true}));

  const newJob = await dispatch(requestUpdateJob(_id, {
    name,
    repoType,
    repoUrl,
    branch,
    credential,
    description,
    cdFilePath,
    agentTags,
  }));

  dispatch(updateEditJobModalData({loading: false}));

  return newJob;
};

export const hideCreateJobModal = () => ({type: HIDE_CREATE_JOB_MODAL});

export const requestDeleteJob = id => ({
  type: DELETE_JOB,
  func: () => del(`/jobs/${id}`),
  identity: id,
});

export const requestJobDetails = id => ({
  type: GET_JOB_DETAILS,
  func: () => get(`/jobs/${id}`),
});