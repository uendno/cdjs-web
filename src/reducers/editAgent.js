import {
  OPEN_ADD_AGENT_MODAL,
  CLOSE_ADD_AGENT_MODAL,
  UPDATE_BEING_EDITED_AGENT,
  ADD_AGENT_COMPLETE,
  ADD_AGENT,
  ADD_AGENT_ERROR,
  OPEN_EDIT_AGENT_MODEL,
  CLOSE_EDIT_AGENT_MODAL,
  UPDATE_EDIT_AGENT_MODAL_DATA,
  UPDATE_AGENT_COMPLETE,
  UPDATE_AGENT,
  UPDATE_AGENT_ERROR,
} from '../actions/types';

const initialState = {
  modal: {
    show: false,
    loading: false,
    invalidNameMessage: '',
  },
};

const editAgent = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ADD_AGENT_MODAL:
      return {
        ...state,
        modal: {
          invalidNameMessage: '',
          show: true,
          mode: 'add',
        },
      };

    case CLOSE_ADD_AGENT_MODAL:
      return {
        ...initialState,
      };

    case OPEN_EDIT_AGENT_MODEL:
      return {
        ...state,
        modal: {
          invalidNameMessage: '',
          show: true,
          mode: 'edit',
        },
        ...action.agent,
      };

    case CLOSE_EDIT_AGENT_MODAL:
      return {
        ...initialState,
      };

    case UPDATE_BEING_EDITED_AGENT:
    {
      return {
        ...state,
        ...action.data,
      };
    }

    case UPDATE_EDIT_AGENT_MODAL_DATA:
    {
      return {
        ...state,
        modal: {
          ...state.modal,
          ...action.data,
        },
      };
    }

    case ADD_AGENT:
    {
      return {
        ...state,
        modal: {
          ...state.modal,
          loading: true,
        },
      };
    }

    case ADD_AGENT_ERROR:
    {
      return {
        ...state,
        modal: {
          ...state.modal,
          loading: false,
        },
      };
    }

    case ADD_AGENT_COMPLETE:
    {
      return {
        ...state,
        modal: {
          ...state.modal,
          token: action.data.token,
          loading: false,
        },
      };
    }

    case UPDATE_AGENT:
    {
      return {
        ...state,
        modal: {
          ...state.modal,
          loading: true,
        },
      };
    }

    case UPDATE_AGENT_ERROR:
    {
      return {
        ...state,
        modal: {
          ...state.modal,
          loading: false,
        },
      };
    }

    case UPDATE_AGENT_COMPLETE:
    {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};

export default editAgent;

export const getDataForEditNameForm = state => ({name: state.name, invalidNameMessage: state.modal.invalidNameMessage});