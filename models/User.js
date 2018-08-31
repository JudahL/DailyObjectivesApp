const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    unique: true,
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

/**
 * Compares the given username and password with the user details on the database
 * If the user exists and the passwords match: authentication has been successful and the user is supplied to the callback
 */
UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username: username })
    .exec()
    .then(user => {
      if (!user) {
        const err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }

      // Compare the provided password with the stored and hashed password
      bcrypt.compare(password, user.password, (err, passwordsMatch) => {
        if (err) {
          return callback(err);
        } else if (!passwordsMatch) {
          // The passwords don't match and there were no errors so don't supply any parameters to the callback
          return callback();
        }

        // The password comparison has passed, supply the callback with the user and no errors
        callback(null, user);
      });
    })
    .catch(err => callback(err));
}

// Queries the database for a User with the given id and either returns the user's username or throws a 404 error
UserSchema.statics.getUserById = function (userId) {
  return User.findById(userId)
    .exec()
    .then(user => {
      if (user !== null) {
        return { user: user.username };
      } else {
        throw new handleNotFound('user');
      }
    });
}

/**
 * Hash password using bcrypt before saving to MongoDB
 * Important to use standard function syntax as parameter instead of arrow function due to lexical this
 */
UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    } else {
      user.password = hash;
      next();
    }
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;