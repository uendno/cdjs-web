import {ADD_AGENT_COMPLETE, GET_ALL_AGENTS_COMPLETE, DELETE_AGENT_COMPLETE, UPDATE_AGENT_COMPLETE, EDIT_AGENT_IMMEDIATELY} from '../constants/actions';

const initialState = {
  byId: {},
  ids: [],
};

const agents = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_AGENTS_COMPLETE:
    {
      const byId = {};
      const ids = [];

      action
        .data
        .forEach((agent) => {
          byId[agent._id] = agent;
          ids.push(agent._id);
        });

      return {byId, ids};
    }

    case ADD_AGENT_COMPLETE:
    {
      const data = action.data;
      const agent = data.agent;
      const byId = {
        ...state.byId,
      };

      byId[agent._id] = agent;

      return {
        byId,
        ids: [
          ...state.ids,
          agent._id,
        ],
      };
    }

    case DELETE_AGENT_COMPLETE:
    {
      const id = action.identity;

      const byId = {
        ...state.byId,
      };
      const ids = [...state.ids].filter(i => i !== id);

      byId[id] = null;

      return {
        ...state,
        byId,
        ids,
      };
    }

    case UPDATE_AGENT_COMPLETE:
    {
      const agent = action.data;

      const byId = {
        ...state.byId,
      };
      byId[agent._id] = agent;

      return {
        ...state,
        byId,
      };
    }

    case EDIT_AGENT_IMMEDIATELY:
    {
      const data = action.data;
      const id = action.id;

      const byId = {
        ...state.byId,
      };

      byId[id] = {
        ...byId[id],
        ...data,
      };

      return {
        ...state,
        byId,
      };
    }

    default:
      return state;
  }
};

export default agents;

export const getAllAgents = state => state
  .ids
  .map(id => state.byId[id]);

export const getAgentById = (state, id) => state.byId[id];