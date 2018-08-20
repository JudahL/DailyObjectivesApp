import { Map, List, fromJS } from 'immutable';
import errorMessages from '../errorMessages/userSignInMessages';

/**
 * =======================
 * THIS FILE IS DEPRECATED
 * =======================
 */

const INITIAL_USER_ERRORS_STATE = Map({
  username: '',
  password: '',
  field: '',
});

const INITIAL_STATE = Map({
  objectives: List(),
  user: '',
  isLoading: false,
  errors: Map({
    user: INITIAL_USER_ERRORS_STATE,
  }),
});


function setState(state, newState) {
  return state.merge(newState);
}

function addObjective(state, objective) {
  if (objective !== null) {
    const objectivesList = state.get('objectives').push(Map(objective));
    return state.set('objectives', objectivesList);
  }
  return state;
}

function markObjective(state, objectiveIndex, objective) {
  return state.setIn(['objectives', objectiveIndex], Map(objective));
}

function removeObjective(state, objectiveId, response) {
  if (response === 'success') {
    const objectivesList = state.get('objectives')
      .filter(objective => objective.get('_id') !== objectiveId);
    return state.set('objectives', objectivesList);
  }
  return state;
}

function clearUserErrors(state) {
  return state.setIn(['errors', 'user'], INITIAL_USER_ERRORS_STATE);
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.newState);
    case 'GET_OBJECTIVES':
      return state.set('objectives', fromJS(action.payload.objectives));
    case 'ADD_OBJECTIVE':
      return addObjective(state, action.payload);
    case 'MARK_OBJECTIVE':
      return markObjective(state, action.objectiveIndex, action.payload);
    case 'REMOVE_OBJECTIVE':
      return removeObjective(state, action.objectiveId, action.payload);
    case 'ADD_USER':
      return state.set('user', action.payload);
    case 'USER_ERROR':
      return state.setIn(['errors', 'user', errorMessages.getIn([action.payload, 'type'])], errorMessages.getIn([action.payload, 'msg']));
    case 'CLEAR_USER_ERRORS':
      return clearUserErrors(state);
    case 'SIGN_IN':
      return state.set('user', action.payload);
    case 'SIGN_OUT':
      return INITIAL_STATE;
    case 'GET_USER':
      return state.set('user', action.payload);
    case 'LOADING':
      return state.set('isLoading', true);
    default:
      return state;
  }
}
