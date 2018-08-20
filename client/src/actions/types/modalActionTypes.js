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

export const TURN_ON_MODAL = 'TURN_ON_MODAL';
export const TURN_OFF_MODAL = 'TURN_OFF_MODAL';
