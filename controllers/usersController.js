const users = require('../domain/users');

/**
 * GET
 * Find by session id and return the users username in the response
 */
exports.user_get = function (req, res, next) {

  users.findUserById((req.session && req.session.userId) || null)
    .then(user => {
      if (user === null) return res.json('');

      res.json(user.username);
    })
    .catch(err => next(err));

}

/**
 * POST
 * Register a new user to the database and return the users username in the response if successful
 */
exports.userRegister_post = function (req, res, next) {

  users.registerUser(req.body)
    .then(user => {
      // If registration is successful set the userId field in the session to be the MongoDB id
      // This will be used in other routes to check whether a user is already logged in
      req.session.userId = user._id;

      return res.json(user.username);
    })
    .catch(err => next(err));

}

/**
 * POST
 * Authenticate and sign in user, returning the users username in the response if successful
 */
exports.userSignIn_post = function (req, res, next) {

  users.userSignIn(req.body)
    .then(user => {
      // If authentication is successful set the userId field in the session to be the MongoDB id
      // This will be used in other routes to check whether a user is already logged in
      req.session.userId = user._id;

      res.json(user.username);
    })
    .catch(err => next(err));

};

/**
 * POST
 * Sign out user, deleting the session and redirecting the user to '/' if successful
 */
exports.userSignOut_post = function (req, res, next) {
  if (!req.session) return;

  // Destroy the users session and reroute the user back to the default entry page if successful
  req.session.destroy(err => {
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
};
