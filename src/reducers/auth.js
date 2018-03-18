import jwt from 'jsonwebtoken';
import {LOGIN_COMPLETE} from '../constants/actions';
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
      const accessToken = action.data;
      const decoded = jwt.decode(accessToken);
      localStorageSrv.set('accessToken', accessToken);
      return {accessToken, decoded};
    }

    default:
      return state;
  }
};

export default auth;

export const getAccessToken = state => state.accessToken;
export const getUserInfo = state => state.decoded.sub;