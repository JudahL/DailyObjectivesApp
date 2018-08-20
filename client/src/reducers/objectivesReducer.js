import { Map, List, fromJS } from 'immutable';
import {
  GET_OBJECTIVES,
  ADD_OBJECTIVE,
  REMOVE_OBJECTIVE,
  UPDATE_OBJECTIVE,
  SELECT_OBJECTIVE,
} from '../actions/types/objectivesActionTypes';
import { SIGN_OUT } from '../actions/types/userActionTypes';

const INITIAL_STATE = Map({
  list: List(),
  currentlySelectedIndex: 0,
});

function getObjectives(state, objectivesData) {
  if (objectivesData) {
    return state.set('list', fromJS(objectivesData.objectives));
  }

  return state;
}

function addObjective(state, objective) {
  if (objective !== null) {
    const newListState = state.get('list').push(Map(objective));
    return state.set('list', newListState);
  }
  return state;
}

function updateObjective(state, objectiveIndex, objective) {
  return state.setIn(['list', objectiveIndex], Map(objective));
}

function removeObjective(state, objectiveId, response) {
  if (response === 'success') {
    const newListState = state.get('list').filter(objective => objective.get('_id') !== objectiveId);
    return state.set('list', newListState);
  }
  return state;
}

function selectObjective(state, objectiveIndex) {
  return state.set('currentlySelectedIndex', objectiveIndex);
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_OBJECTIVES:
      return getObjectives(state, action.payload);
    case ADD_OBJECTIVE:
      return addObjective(state, action.payload);
    case UPDATE_OBJECTIVE:
      return updateObjective(state, action.objectiveIndex, action.payload);
    case REMOVE_OBJECTIVE:
      return removeObjective(state, action.objectiveId, action.payload);
    case SELECT_OBJECTIVE:
      return selectObjective(state, action.objectiveIndex);
    case SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
}
