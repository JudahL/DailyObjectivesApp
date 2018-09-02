const User = require('../models/User');

exports.findUserById = function (userId) {
  return User.findById(userId)
    .exec()
}

exports.registerUser = function (userData) {
  return new Promise(function (resolve, reject) {
    //If all fields aren't supplied then reject with an error message
    if (!userData.username || !userData.password || !userData.passwordConfirm) {
      return reject('fieldsMustBeFilled');
    }

    // Ensure the user has entered the same 'password' and 'confirm password'
    if (userData.password !== userData.passwordConfirm) {
      return reject('passwordsDoNotMatch');
    }

    const newUser = {
      username: userData.username,
      password: userData.password
    }

    // Add a new user to the database
    User.create(newUser, (err, user) => {
      if (err) {
        return reject(err.code.toString());
      }

      resolve(user);
    });
  });
}

exports.userSignIn = function (userData) {
  return new Promise(function (resolve, reject) {
    // If either the username or password isn't supplied then reject with an error message
    if (!userData.username || !userData.password) {
      return reject('fieldsMustBeFilled');
    }

    // Ensure the username and password the user has entered corresponds to a user on the database
    User.authenticate(userData.username, userData.password, (error, user) => {
      if (error || !user) return reject('wrongUsernameOrPassword');

      resolve(user);
    });
  });
}