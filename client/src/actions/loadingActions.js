import { LOADING_SIGN_IN, LOADING_MARK_OBJECTIVE, LOADING_FALSE } from './types/loaderActionTypes';

export function setLoadingSignIn() {
  return {
    type: LOADING_SIGN_IN,
  };
}

export function setLoadingMarkObjective(objectiveIndex) {
  return {
    type: LOADING_MARK_OBJECTIVE,
    objectiveIndex,
  };
}


export function setLoadingFalse() {
  return {
    type: LOADING_FALSE,
  };
}