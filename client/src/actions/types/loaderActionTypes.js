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

export const LOADING_SIGN_IN = 'LOADING_SIGN_IN';
export const LOADING_MARK_OBJECTIVE = 'LOADING_MARK_OBJECTIVE';
export const LOADING_FALSE = 'LOADING_FALSE';