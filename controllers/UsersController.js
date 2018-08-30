const User = require('../models/User');

// Get user by session id
exports.user_get = function (req, res, next) {
  User.findById(req.session.userId)
    .exec()
    .then(user => {
      if (user === null) {
        return res.json('');
      } else {
        return res.json(user.username);
      }
    })
    .catch(err => next(err));
}

// Register new user
exports.userRegister_post = function (req, res, next) {

  //If all fields aren't supplied then return an error
  if (!req.body.username || !req.body.password || !req.body.passwordConfirm) {
    return next(userError('FieldsMustBeFilled', 400));
  }

  // Ensure the user has entered the same 'password' and 'confirm password'
  if (req.body.password !== req.body.passwordConfirm) {
    return next(userError('PasswordsDoNotMatch', 400));
  }

  const newUser = {
    username: req.body.username,
    password: req.body.password
  }

  // Add a new user to the database
  User.create(newUser, (err, user) => {
    if (err) {
      const error = new Error(err.code.toString());
      return next(error);
    } else {
      return res.json(user.username);
    }
  });
}

// Authenticate and sign in user
exports.userSignIn_post = function (req, res, next) {
  // If either the username or password isn't supplied then return an error
  if (!req.body.username || !req.body.password) {
    return next(userError('FieldsMustBeFilled', 400));
  }

  // Ensure the username and password the user has entered corresponds to a user on the database
  User.authenticate(req.body.username, req.body.password, (error, user) => {
    if (error || !user) {
      return next(userError('WrongUsernameOrPassword', 401));
    } else {
      // If authentication is successful set the userId field in the session to be the MongoDB id
      // This will be used in other routes to check whether a user is already logged in
      req.session.userId = user._id;

      return res.json(user.username);
    }
  });
};

// Sign out user
exports.userSignOut_post = function (req, res, next) {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
};


// Create and return a new error given a specified error message and http status
function userError(message, status) {
  const err = new Error(message);
  err.status = status;
  return err;
}
