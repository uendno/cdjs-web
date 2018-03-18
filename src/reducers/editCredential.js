import {EDIT_CREDENTIAL_START, EDIT_CREDENTIAL_CLOSE, UPDATE_BEING_EDITED_CREDENTIAL} from '../constants/actions';

const initialState = {
  _id: null,
  name: '',
  invalidNameMessage: '',
  loading: false,
  type: 'username/password',
  data: {},
  mode: 'create',
};

const editCredentialModal = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_CREDENTIAL_START:
    {
      if (action.credential) {
        return {
          ...initialState,
          ...action.credential,
          show: true,
          mode: action.mode,
        };
      }
      return {
        ...initialState,
        ...state,
        show: true,
        mode: action.mode,
      };
    }

    case EDIT_CREDENTIAL_CLOSE:
    {
      return {
        ...initialState,
      };
    }

    case UPDATE_BEING_EDITED_CREDENTIAL:
    {
      return {
        ...state,
        ...action.data,
      };
    }

    default:
      return state;
  }
};

export default editCredentialModal;