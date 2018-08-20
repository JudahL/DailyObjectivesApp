import { Map } from 'immutable';

/**
 * Used to convert error messages from the server to usable error Maps
 * with a type and readable message
 */
const errorMessages = Map({
  11000: Map({ msg: 'Usename is already in use', type: 'username' }),
  PasswordsDoNotMatch: Map({ msg: 'Passwords do not match', type: 'password' }),
  FieldsMustBeFilled: Map({ msg: 'All fields must be filled', type: 'field' }),
  WrongUsernameOrPassword: Map({ msg: 'Wrong username or password', type: 'field' }),
});

export default errorMessages;
