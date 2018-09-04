const User = require('../models/User');

/**
 * Returns the user with matching user id if it exists
 * @param {number} userId - The id of the user to search for
 */
exports.findUserById = async function (userId) {
  return await User.findById(userId);
}

/**
 * Registers a new user with the provided user data
 * @param {Object} userData - An object containing the users username, password and confirmed password
 */
exports.registerUser = async function (userData) {
  //If all fields aren't supplied then reject with an error message
  if (!userData.username || !userData.password || !userData.passwordConfirm) {
    throw new Error('fieldsMustBeFilled');
  }

  // Ensure the user has entered the same 'password' and 'confirm password'
  if (userData.password !== userData.passwordConfirm) {
    throw new Error('passwordsDoNotMatch');
  }

  const newUser = {
    username: userData.username,
    password: userData.password
  }

  // Add a new user to the database
  const user = await User.create(newUser);

  return user;
}

/**
 * Sign in a user and return the users details if successful
 * @param {Object} userData - The users username and password
 */
exports.userSignIn = async function (userData) {
  // If either the username or password isn't supplied then reject with an error message
  if (!userData.username || !userData.password) {
    throw new Error('fieldsMustBeFilled');
  }

  // Ensure the username and password the user has entered corresponds to a user on the database
  const user = await User.authenticate(userData.username, userData.password)

  return user;
}