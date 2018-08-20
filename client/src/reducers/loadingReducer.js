import { Map } from 'immutable';
import { LOADING_SIGN_IN, LOADING_MARK_OBJECTIVE, LOADING_FALSE } from '../actions/types/loaderActionTypes';

const INITIAL_STATE = Map({
  signInLoading: false,
  markObjectiveLoadingIndex: -1,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOADING_SIGN_IN:
      return state.set('signInLoading', true);
    case LOADING_MARK_OBJECTIVE:
      return state.set('markObjectiveLoadingIndex', action.objectiveIndex);
    case LOADING_FALSE:
      return INITIAL_STATE;
    default:
      return state;
  }
}