import axios from 'axios';
import {
  GET_OBJECTIVES,
  ADD_OBJECTIVE,
  REMOVE_OBJECTIVE,
  UPDATE_OBJECTIVE,
  SELECT_OBJECTIVE,
} from './types/objectivesActionTypes';

export const getObjectives = () => (dispatch) => {
  axios
    .get('/api/objectives')
    .then(res => dispatch({
      type: GET_OBJECTIVES,
      payload: res.data,
    }));
};

export const addObjective = objective => (dispatch) => {
  axios
    .post('/api/objectives', objective)
    .then(res => dispatch({
      type: ADD_OBJECTIVE,
      payload: res.data,
    }));
};

export const removeObjective = objectiveId => (dispatch) => {
  axios
    .delete(`/api/objectives/${objectiveId}`)
    .then(res => dispatch({
      type: REMOVE_OBJECTIVE,
      objectiveId,
      payload: res.data,
    }));
};

export const markObjective = (objectiveIndex, objectiveId, value) => (dispatch) => {
  const data = { isChecked: value };
  axios
    .put(`/api/objectives/${objectiveId}`, data)
    .then(res => dispatch({
      type: UPDATE_OBJECTIVE,
      objectiveIndex,
      payload: res.data,
    }));
};

export const updateObjective = (objectiveIndex, objectiveId, data) => (dispatch) => {
  axios
    .put(`/api/objectives/${objectiveId}`, data)
    .then(res => dispatch({
      type: UPDATE_OBJECTIVE,
      objectiveIndex,
      payload: res.data,
    }));
};

export function selectObjective(index) {
  return {
    type: SELECT_OBJECTIVE,
    objectiveIndex: index,
  };
}
