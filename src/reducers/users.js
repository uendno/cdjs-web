import {GET_ALL_USERS_COMPLETE, UPDATE_USER_COMPLETE, CREATE_USER_COMPLETE, DELETE_USER_COMPLETE} from '../constants/actions';

const initialState = {
  byId: {},
  ids: [],
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_COMPLETE:
    {
      const users = action.data;
      const byId = {};
      const ids = [];

      users.forEach((user) => {
        byId[user._id] = user;
        ids.push(user._id);
      });

      return {byId, ids};
    }

    case UPDATE_USER_COMPLETE: {
      const byId = {...state.byId};
      const user = action.data;
      byId[user._id] = user;

      return {
        ...state,
        byId,
      };
    }

    case CREATE_USER_COMPLETE: {
      const byId = {...state.byId};
      const user = action.data;
      byId[user._id] = user;

      return {
        ...state,
        byId,
        ids: [...state.ids, user._id],
      };
    }

    case DELETE_USER_COMPLETE: {
      const byId = {...state.byId}.omit;
    }

    default:
      return state;
  }
};

export default users;

export const getAllUsers = state => state
  .ids
  .map(id => state.byId[id]);