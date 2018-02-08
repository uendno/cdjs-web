import {GET_ALL_USERS_COMPLETE} from '../actions/types';

const initialState = {
  byId: {},
  ids: [],
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_COMPLETE: {
      const users = action.data;
      const byId = {};
      const ids = [];

      users.forEach((user) => {
        byId[user._id] = user;
        ids.push(user._id);
      });

      return {
        byId,
        ids,
      };
    }
    default:
      return state;
  }
};

export default users;

export const getAllUsers = state => state.ids.map(id => state.byId[id]);