import { Map } from 'immutable';
import errorMessages from '../errorMessages/userSignInMessages';
import { USER_ERROR, CLEAR_USER_ERRORS, SIGN_OUT } from '../actions/types/userActionTypes';

const INITIAL_USER_ERRORS_STATE = Map({
  username: '',
  password: '',
  field: '',
});

const INITIAL_STATE = Map({
  user: INITIAL_USER_ERRORS_STATE,
});

function handleUserError(state, errorType) {
  const errorMessage = errorMessages.get(errorType);
  if (errorMessage) {
    return state.setIn(['user', errorMessage.get('type')], errorMessage.get('msg'));
  }

  return state;
}

function clearUserErrors(state) {
  return state.set('user', INITIAL_USER_ERRORS_STATE);
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_ERROR:
      return handleUserError(state, action.payload);
    case CLEAR_USER_ERRORS:
      return clearUserErrors(state);
    case SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
}
