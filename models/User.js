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
UserSchema.statics.authenticate = (username, password, callback) => {
  User.findOne({ username: username })
    .exec()
    .then(user => {
      // If no user was found with the given username, send an error to the callback
      if (!user) {
        const err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }

      //Compare the provided password with the stored password
      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          // The passwords match, therefore the authentication is successful
          // Supply the callback with the user and no errors
          return callback(null, user);
        } else if (err) {
          return callback(err);
        }
        // The passwords don't match and no errors were thrown
        callback();
      });
    })
    .catch(err => callback(err));
}

/**
 * Hash password before saving to MongoDB
 * Important to use standard function as parameter instead of arrow function due to lexical this
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