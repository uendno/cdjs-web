import {
  OPEN_EDIT_USER_MODAL,
  CLOSE_EDIT_USER_MODAL,
  UPDATE_BEING_EDITED_USER,
} from '../constants/actions';

const initialState = {
  mode: 'add',
  _id: null,
  email: '',
  role: 'user',
  password: null,
  passwordConfirmation: null,
  show: false,
  invalidEmailMessage: '',
  invalidPasswordConfirmationMessage: '',
  loading: false,
  disabled: true,
};

const editUser = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_EDIT_USER_MODAL: {
      if (action.mode === 'add') {
        return {
          ...initialState,
          show: true,
        };
      } else if (action.mode === 'edit') {
        return {...initialState, mode: 'edit', _id: action.userId, email: action.email, role: action.role, show: true};
      }

      return state;
    }

    case CLOSE_EDIT_USER_MODAL: {
      return {
        ...initialState,
      };
    }

    case UPDATE_BEING_EDITED_USER: {
      const newState = {
        ...state,
        ...action.data,
      };

      const {password, passwordConfirmation, email} = newState;

      if (password !== passwordConfirmation) {
        newState.invalidPasswordConfirmationMessage = 'Password confirmation does not match!';
      } else {
        newState.invalidPasswordConfirmationMessage = '';
      }

      const {invalidEmailMessage, invalidPasswordConfirmationMessage, loading} = newState;

      if (loading || invalidEmailMessage !== '' || invalidPasswordConfirmationMessage !== '') {
        newState.disabled = true;
      } else {
        newState.disabled = false;
      }

      if (!password || !passwordConfirmation || !email) {
        newState.disabled = true;
      }

      return newState;
    }

    default:
      return state;
  }
};

export default editUser;