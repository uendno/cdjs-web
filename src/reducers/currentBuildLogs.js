import {READ_LOG, CANCEL_READ_LOG, RECEIVE_LOG} from '../constants/actions';

const initialState = {
  currentBuildId: null,
  logs: [],
};

const currentBuildLogs = (state = initialState, action) => {
  switch (action.type) {
    case READ_LOG:
    {
      return {
        ...initialState,
        currentBuildId: action.buildId,
      };
    }

    case CANCEL_READ_LOG:
    {
      return initialState;
    }
    case RECEIVE_LOG:
    {
      return {
        ...state,
        logs: [
          ...state.logs,
          ...action.logs,
        ],
      };
    }

    default:
      return state;
  }
};

export const getLogs = state => state.logs;

export const getCurrentBuildId = state => state.currentBuildId;

export default currentBuildLogs;
