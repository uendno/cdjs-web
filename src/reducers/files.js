import {GET_FILES, GET_FILES_COMPLETE} from '../constants/actions';

const initialState = {};

const files = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILES:
    {
      return {
        ...initialState,
      };
    }

    case GET_FILES_COMPLETE:
    {
      return {
        ...action.data,
      };
    }

    default:
      return state;
  }
};

export default files;