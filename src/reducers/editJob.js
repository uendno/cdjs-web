import {
  GET_JOB_DETAILS_COMPLETE,
  GET_JOB_DETAILS,
  UPDATE_BEING_EDITED_JOB,
  EDIT_JOB_CLOSE,
  SHOW_CREATE_JOB_MODAL,
  HIDE_CREATE_JOB_MODAL,
  UPDATE_EDIT_JOB_MODAL_DATA,
} from '../constants/actions';

const initialState = {
  _id: null,
  modal: {
    invalidNameMessage: '',
    invalidRepoUrlMessage: '',
    loading: false,
    showCreateJobModal: false,
  },
};

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_JOB_DETAILS:
    {
      return {
        ...initialState,
      };
    }

    case GET_JOB_DETAILS_COMPLETE:
    {
      return {
        ...state,
        ...action.data,
      };
    }

    case EDIT_JOB_CLOSE:
    {
      return {
        ...initialState,
      };
    }

    case UPDATE_BEING_EDITED_JOB:
    {
      return {
        ...state,
        ...action.data,
      };
    }

    case UPDATE_EDIT_JOB_MODAL_DATA:
    {
      return {
        ...state,
        modal: {
          ...state.modal,
          ...action.data,
        },
      };
    }

    case SHOW_CREATE_JOB_MODAL:
    {
      return {
        ...initialState,
        modal: {
          ...state.modal,
          showCreateJobModal: true,
        },
      };
    }

    case HIDE_CREATE_JOB_MODAL:
    {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};

export const getModalData = state => state.modal;

export const getDataForJobNameForm = ({modal, name, _id}) => ({invalidNameMessage: modal.invalidNameMessage, name, _id});

export const checkIfShouldShowCreateJobModal = ({modal}) => modal.showCreateJobModal;

export const checkIfNewJobAbleToBeCreated = ({modal}) => !modal.loading && modal.invalidNameMessage === '' && modal.invalidRepoUrlMessage === '';

export const getBeingEditedJobName = state => state.name;

export const getBeingEditedJobId = state => state._id;