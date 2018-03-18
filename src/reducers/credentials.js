import _ from 'lodash';
import {GET_ALL_CREDENTIALS_COMPLETE, CREATE_CREDENTIAL_COMPLETE, DELETE_CREDENTIAL_COMPLETE, UPDATE_CREDENTIAL_COMPLETE} from '../constants/actions';

const credentials = (state = {
  ids: [],
  byId: {},
}, action) => {
  switch (action.type) {
    case GET_ALL_CREDENTIALS_COMPLETE:
    {
      const credentials = action.data;
      const byId = {};
      const ids = [];

      credentials.forEach((c) => {
        byId[c._id] = c;
        ids.push(c._id);
      });

      return {
        ...state,
        byId,
        ids,
      };
    }

    case CREATE_CREDENTIAL_COMPLETE:
    {
      const byId = {
        ...state.byId,
      };

      byId[action.data._id] = action.data;

      return {
        ...state,
        byId,
        ids: [
          action.data._id, ...state.ids,
        ],
      };
    }

    case DELETE_CREDENTIAL_COMPLETE:
    {
      return {
        ...state,
        byId: _.omit(state.byId, action.identity),
        ids: state
          .ids
          .filter(id => id !== action.identity),
      };
    }

    case UPDATE_CREDENTIAL_COMPLETE: {
      const byId = {
        ...state.byId,
      };

      const credential = action.data;

      byId[credential._id] = credential;

      return {
        ...state,
        byId,
      };
    }

    default:
      return state;
  }
};

export default credentials;

export const getCredentials = state => state
  .ids
  .map(id => state.byId[id]);