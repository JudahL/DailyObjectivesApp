import { Map, List } from 'immutable';
import objectivesReducer from './objectivesReducer';
import userReducer from './userReducer';
import errorsReducer from './errorsReducer';
import modalReducer from './modalReducer';

const INITIAL_USER_ERRORS_STATE = Map({
  username: '',
  password: '',
  field: '',
});

const INITIAL_STATE = Map({
  objectives: Map({
    list: List(),
    currentlySelectedIndex: 0,
  }),
  user: '',
  modal: Map({
    isDisplayingModal: false,
    type: '',
  }),
  errors: Map({
    user: INITIAL_USER_ERRORS_STATE,
  }),
});

const reducers = Map({
  objectives: objectivesReducer,
  user: userReducer,
  modal: modalReducer,
  errors: errorsReducer,
});

/**
 * Custom combine reducers function that returns an Immutable Map as the state
 * combineReducers from 'redux' returns a standard javascript object
 * and therefore cannot be used if we wish to maintain the entire state as an immutable type
 */
function rootReducer(prevState = INITIAL_STATE, action) {
  let state = prevState;

  reducers.forEach((reducer, key) => {
    const oldState = state.get(key);
    const newState = reducer(oldState, action);
    state = state.set(key, newState);
  });

  return state;
}

export default rootReducer;
