import { TURN_ON_MODAL, TURN_OFF_MODAL } from './types/modalActionTypes';

export function turnOnModal(mType) {
  return {
    type: TURN_ON_MODAL,
    modalType: mType,
  };
}

export function turnOffModal() {
  return {
    type: TURN_OFF_MODAL,
  };
}
