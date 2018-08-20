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

export const GET_OBJECTIVES = 'GET_OBJECTIVES';
export const ADD_OBJECTIVE = 'ADD_OBJECTIVE';
export const REMOVE_OBJECTIVE = 'REMOVE_OBJECTIVE';
export const UPDATE_OBJECTIVE = 'UPDATE_OBJECTIVE';
export const SELECT_OBJECTIVE = 'SELECT_OBJECTIVE';
