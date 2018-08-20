/**
 * Using constants to store the action type strings to avoid
 * accidently misspelling them and getting no feedback in the editor.
 *
 * This way if we misspell an action type it will show up in the editor.
 * We also have access to code completion.
 *
 * Note: these shouldn't be imported as a wildcard as we won't get code completion
 * or feedback that we have misspelled an action type
 */

export const CLEAR_USER_ERRORS = 'CLEAR_USER_ERRORS';
export const ADD_USER = 'ADD_USER';
export const SIGN_IN = 'SIGN_IN';
export const USER_ERROR = 'USER_ERROR';
export const SIGN_OUT = 'SIGN_OUT';
export const GET_USER = 'GET_USER';
