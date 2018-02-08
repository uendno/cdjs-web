import {GET_USER_PERMISSIONS_COMPLETE} from '../actions/types';

const initialState = {
  byId: {},
  ids: [],
};

const permissions = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PERMISSIONS_COMPLETE: {
      const permissions = action.data;
      const byId = {};
      const ids = [];

      permissions.forEach((permission) => {
        byId[permission._id] = permission;
        ids.push(permission._id);
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

export default permissions;

export const getPermissionsForAnUser = (state, userId) => state.ids.map(id => state.byId[id]).filter(p => p.user === userId);