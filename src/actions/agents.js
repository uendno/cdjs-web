import {
  OPEN_ADD_AGENT_MODAL,
  CLOSE_ADD_AGENT_MODAL,
  UPDATE_BEING_EDITED_AGENT,
  ADD_AGENT,
  GET_ALL_AGENTS,
  UPDATE_AGENT,
  CHECK_AGENT_NAME,
  OPEN_EDIT_AGENT_MODEL,
  CLOSE_EDIT_AGENT_MODAL,
  UPDATE_EDIT_AGENT_MODAL_DATA,
  EDIT_AGENT_IMMEDIATELY,
  DELETE_AGENT,
} from './types';
import {getEditAgentData, getAgentById} from '../reducers';
import {get, del, post, put} from '../helpers/api';


export const openAddAgentModal = () => ({type: OPEN_ADD_AGENT_MODAL});

export const closeAddAgentModal = () => ({type: CLOSE_ADD_AGENT_MODAL});

export const openEditAgentModal = agentId => (dispatch, getState) => {
  const state = getState();

  const agent = getAgentById(state, agentId);

  dispatch({type: OPEN_EDIT_AGENT_MODEL, agent});
};

export const closeEditAgentModal = () => ({type: CLOSE_EDIT_AGENT_MODAL});

export const updateBeingEditedAgent = data => ({type: UPDATE_BEING_EDITED_AGENT, data});

export const updateEditAgentModalData = data => ({type: UPDATE_EDIT_AGENT_MODAL_DATA, data});

export const addAgent = async() => ({
  type: ADD_AGENT,
  func: (dispatch, getState) => {
    const state = getState();
    const name = getEditAgentData(state).name;
    return post('/agents', {name});
  },
});

export const requestAllAgents = async() => ({
  type: GET_ALL_AGENTS,
  func: () => get('/agents'),
});

export const updateEnabledPropertyForAgent = async(id, value) => ({
  type: UPDATE_AGENT,
  func: () => put(`/agents/${id}`, {
    enabled: value,
  }),
});

export const editAgentImmediately = (id, data) => ({type: EDIT_AGENT_IMMEDIATELY, id, data});

export const updateAgent = async() => ({
  type: UPDATE_AGENT,
  func: (dispatch, getState) => {
    const state = getState();
    const beingEdited = getEditAgentData(state);

    const data = {
      name: beingEdited.name,
      enabled: beingEdited.enabled,
      numberOfConcurrentBuilds: beingEdited.numberOfConcurrentBuilds,
      tags: beingEdited.tags,
    };

    return put(`/agents/${beingEdited._id}`, data);
  },
});

export const checkAgentName = (name, agentId) => ({
  type: CHECK_AGENT_NAME,
  func: () => post('/name-validations', {
    currentId: agentId,
    name,
    collection: 'agents',
  }),
});

export const deleteAgent = id => ({
  type: DELETE_AGENT,
  func: () => del(`/agents/${id}`),
  identity: id,
});