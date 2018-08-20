const express = require('express');
const User = require('../../models/User');

const router = express.Router();

/**
 * '/api/users' routes:
 */
router.post('/register', (req, res, next) => {
  if (req.body.username && req.body.password && req.body.passwordConfirm) {

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
  } else {
    //If all fields aren't supplied then return an error
    return next(userError('FieldsMustBeFilled', 400));
  }
});

router.post('/signin', (req, res, next) => {
  if (req.body.username && req.body.password) {
    User.authenticate(req.body.username, req.body.password, (error, user) => {
      if (error || !user) {
        return next(userError('WrongUsernameOrPassword', 401));
      } else {
        req.session.userId = user._id;
        return res.json(user.username);
      }
    });
  } else {
    //If all fields aren't supplied then return an error
    return next(userError('FieldsMustBeFilled', 400));
  }
});

router.post('/signout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

router.get('/get', (req, res, next) => {
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
});


function userError(message, status) {
  const err = new Error(message);
  err.status = status;
  return err;
}

module.exports = router;
