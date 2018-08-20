import {
  GET_USER,
  ADD_USER,
  SIGN_IN,
  SIGN_OUT,
} from '../actions/types/userActionTypes';

const INITIAL_STATE = '';

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_USER:
      return action.payload;
    case SIGN_IN:
      return action.payload;
    case SIGN_OUT:
      return INITIAL_STATE;
    case GET_USER:
      return action.payload;
    default:
      return state;
  }
}
