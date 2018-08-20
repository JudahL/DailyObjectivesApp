import { Map } from 'immutable';
import { TURN_ON_MODAL, TURN_OFF_MODAL } from '../actions/types/modalActionTypes';

const INITIAL_STATE = Map({
  isDisplayingModal: false,
  type: '',
});

function turnOnModal(modalType) {
  return Map({ isDisplayingModal: true, type: modalType });
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TURN_ON_MODAL:
      return turnOnModal(action.modalType);
    case TURN_OFF_MODAL:
      return INITIAL_STATE;
    default:
      return state;
  }
}
