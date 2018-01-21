import _ from 'lodash';
import {
    OPEN_ADD_AGENT_MODAL, CLOSE_ADD_AGENT_MODAL, UPDATE_BEING_EDITED_AGENT,
    ADD_AGENT_COMPLETE, ADD_AGENT_REQUEST, ADD_AGENT_ERROR,
    GET_ALL_AGENTS_REQUEST, GET_ALL_AGENTS_COMPLETE, GET_ALL_AGENTS_ERROR,
    UPDATE_AGENT_REQUEST, UPDATE_AGENT_COMPLETE, UPDATE_AGENT_ERROR,
    CHECK_AGENT_NAME_REQUEST, CHECK_AGENT_NAME_COMPLETE, CHECK_AGENT_NAME_ERROR,
    OPEN_EDIT_AGENT_MODEL, CLOSE_EDIT_AGENT_MODAL,
    UPDATE_EDIT_AGENT_MODAL_DATA,
    DELETE_AGENT_COMPLETE, DELETE_AGENT_ERROR, DELETE_AGENT_REQUEST,
    EDIT_AGENT_IMMEDIATELY
} from './types';
import {getEditAgentData, getAgentById} from '../reducers';
import * as agentsApi from '../api/agents';


export const openAddAgentModal = () => {
    return {
        type: OPEN_ADD_AGENT_MODAL
    }
};

export const closeAddAgentModal = () => {
    return {
        type: CLOSE_ADD_AGENT_MODAL
    }
};

export const openEditAgentModal = (agentId) => (dispatch, getState) => {
    const state = getState();

    const agent = getAgentById(state, agentId);

    dispatch({
        type: OPEN_EDIT_AGENT_MODEL,
        agent
    })
};

export const closeEditAgentModal = () => {
    return {
        type: CLOSE_EDIT_AGENT_MODAL
    }
};

export const updateBeingEditedAgent = (data) => {
    return {
        type: UPDATE_BEING_EDITED_AGENT,
        data
    }
};

export const updateEditAgentModalData = (data) => {
    return {
        type: UPDATE_EDIT_AGENT_MODAL_DATA,
        data
    }
};

export const addAgent = async () => ({
    func: async (dispatch, getState) => {

        const state = getState();
        const name = getEditAgentData(state).name;

        dispatch({
            type: ADD_AGENT_REQUEST,
            name
        });


        const res = await agentsApi.addAgent({
            name
        });
        const token = res.token;
        const agent = _.omit(res, 'token');

        dispatch({
            type: ADD_AGENT_COMPLETE,
            agent,
            token
        })
    },

    errorType: ADD_AGENT_ERROR
});

export const requestAllAgents = async () => ({
    func: async (dispatch) => {
        dispatch({
            type: GET_ALL_AGENTS_REQUEST
        });

        const agents = await agentsApi.getAllAgents();

        dispatch({
            type: GET_ALL_AGENTS_COMPLETE,
            agents
        })
    },

    errorType: GET_ALL_AGENTS_ERROR
});

export const updateEnabledPropertyForAgent = async (id, value) => ({
    func: async (dispatch) => {

        const data = {
            enabled: value
        };

        dispatch({
            type: UPDATE_AGENT_REQUEST,
            id: id,
            data
        });

        const agent = await agentsApi.updateAgent(id, data);

        dispatch({
            type: UPDATE_AGENT_COMPLETE,
            agent
        })
    },

    errorType: UPDATE_AGENT_ERROR
});

export const editAgentImmediately = (id, data) => {
    return {
        type: EDIT_AGENT_IMMEDIATELY,
        id,
        data
    }
};

export const updateAgent = async () => ({
    func: async (dispatch, getState) => {
        const state = getState();
        const beingEdited = getEditAgentData(state);

        const data = {
            name: beingEdited.name,
            enabled: beingEdited.enabled,
            numberOfConcurrentBuilds: beingEdited.numberOfConcurrentBuilds,
            tags: beingEdited.tags,
        };

        dispatch({
            type: UPDATE_AGENT_REQUEST,
            id: beingEdited._id,
            data
        });

        const agent = await agentsApi.updateAgent(beingEdited._id, data);

        dispatch({
            type: UPDATE_AGENT_COMPLETE,
            agent
        })
    },

    errorType: UPDATE_AGENT_ERROR
});

export const checkAgentName = (name, agentId) => ({
    func: async (dispatch) => {
        dispatch({
            type: CHECK_AGENT_NAME_REQUEST,
            name
        });

        const result = await agentsApi.validateName(agentId, name);

        dispatch({
            type: CHECK_AGENT_NAME_COMPLETE,
            result
        });

        return result;
    },

    errorType: CHECK_AGENT_NAME_ERROR
});

export const deleteAgent = (id) => ({
    func: async (dispatch) => {
        dispatch({
            type: DELETE_AGENT_REQUEST,
            id
        });

        await agentsApi.deleteAgent(id);

        dispatch({
            type: DELETE_AGENT_COMPLETE,
            id
        });

        return true;
    },

    errorType: DELETE_AGENT_ERROR
});