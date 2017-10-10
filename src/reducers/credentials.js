import _ from 'lodash';
import {
    GET_ALL_CREDENTIALS_COMPLETE,
    CREATE_CREDENTIAL_COMPLETE,
    DELETE_CREDENTIAL_COMPLETE,
    UPDATE_CREDENTIAL_COMPLETE
} from '../actions/types';


const credentials = (state = {
    ids: [],
    byId: {}
}, action) => {
    switch (action.type) {
        case GET_ALL_CREDENTIALS_COMPLETE: {
            const byId = {};
            const ids = [];

            action.credentials.forEach(c => {
                byId[c._id] = c;
                ids.push(c._id);
            });

            return {
                ...state,
                byId,
                ids
            }
        }

        case CREATE_CREDENTIAL_COMPLETE: {
            const byId = {...state.byId};

            byId[action.credential._id] = action.credential;

            return {
                ...state,
                byId,
                ids: [action.credential._id, ...state.ids]
            }
        }

        case DELETE_CREDENTIAL_COMPLETE: {
            return {
                ...state,
                byId: _.omit(state.byId, action.id),
                ids: state.ids.filter(id => id !== action.id)
            }
        }

        case UPDATE_CREDENTIAL_COMPLETE: {
            const byId = {...state.byId};
            byId[action.id] = action.credential;

            return {
                ...state,
                byId
            }
        }

        default:
            return state;
    }
};

export default credentials;

export const getCredentials = (state) => state.ids.map(id => {
    return state.byId[id];
});