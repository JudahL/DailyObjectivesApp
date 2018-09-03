import { Map } from 'immutable';

/**
 * Used to convert error messages from the server to usable error Maps
 * with a type and readable message
 */
const errorMessages = Map({
  'Username already in use': Map({ msg: 'Usename is already in use', type: 'username' }),
  'Passwords do not match': Map({ msg: 'Passwords do not match', type: 'password' }),
  'All fields must be filled': Map({ msg: 'All fields must be filled', type: 'field' }),
  'Wrong username or password': Map({ msg: 'Wrong username or password', type: 'field' }),
  'Wrong username': Map({ msg: 'Wrong username or password', type: 'field' }),
  'Wrong password': Map({ msg: 'Wrong username or password', type: 'field' }),
});

export default errorMessages;
