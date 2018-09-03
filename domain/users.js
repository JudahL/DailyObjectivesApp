const User = require('../models/User');

exports.findUserById = async function (userId) {
  return await User.findById(userId)
}

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

exports.userSignIn = async function (userData) {
  // If either the username or password isn't supplied then reject with an error message
  if (!userData.username || !userData.password) {
    throw new Error('fieldsMustBeFilled');
  }

  // Ensure the username and password the user has entered corresponds to a user on the database
  const user = await User.authenticate(userData.username, userData.password)

  return user;
}