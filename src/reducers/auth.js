import jwt from 'jsonwebtoken';
import {LOGIN_COMPLETE} from '../actions/types';
import localStorageSrv from '../services/localStorage';

const initialState = {
  accessToken: localStorageSrv.get('accessToken'),
};

if (initialState.accessToken) {
  initialState.decoded = jwt.decode(initialState.accessToken);
}


const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_COMPLETE: {
      const decoded = jwt.decode(action.accessToken);

      return {
        accessToken: action.accessToken,
        decoded,
      };
    }

    default:
      return state;
  }
};

export default auth;

export const getAccessToken = state => state.accessToken;