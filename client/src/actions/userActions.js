import axios from 'axios';
import {
  GET_USER,
  ADD_USER,
  SIGN_IN,
  SIGN_OUT,
  USER_ERROR,
  CLEAR_USER_ERRORS,
} from './types/userActionTypes';
import { setLoadingSignIn, setLoadingFalse } from './loadingActions';

export function clearUserErrors() {
  return {
    type: CLEAR_USER_ERRORS,
  };
}

export const addUser = user => (dispatch) => {
  dispatch(setLoadingSignIn());
  axios
    .post('/api/users/register', user)
    .then(res => dispatch({
      type: ADD_USER,
      payload: res.data,
    }))
    .then(() => dispatch(setLoadingFalse()))
    .catch(error => {
      dispatch({
        type: USER_ERROR,
        payload: error.response.data,
      });
      dispatch(setLoadingFalse());
    });
};

export const signIn = userDetails => (dispatch) => {
  dispatch(setLoadingSignIn());
  axios
    .post('/api/users/signin', userDetails)
    .then(res => dispatch({
      type: SIGN_IN,
      payload: res.data,
    }))
    .then(() => dispatch(setLoadingFalse()))
    .catch(error => {
      dispatch({
        type: USER_ERROR,
        payload: error.response.data,
      });
      dispatch(setLoadingFalse());
    });
};

export const signOut = userDetails => (dispatch) => {
  axios
    .post('/api/users/signout', userDetails)
    .then(res => dispatch({
      type: SIGN_OUT,
      payload: res.data,
    }));
};

export const getUser = () => (dispatch) => {
  axios
    .get('/api/users/get')
    .then(res => dispatch({
      type: GET_USER,
      payload: res.data,
    }));
};
