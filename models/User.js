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
UserSchema.statics.authenticate = function (username, password) {
  return new Promise(function (resolve, reject) {
    User.findOne({ username: username })
      .exec()
      .then(user => {
        if (!user) {
          throw new Error('wrongUsername');
        }

        // Compare the provided password with the stored and hashed password
        return bcrypt.compare(password, user.password)
          .then(passwordsMatch => {
            if (!passwordsMatch) throw new Error('wrongPassword');

            resolve(user);
          })
      })
      .catch(err => reject(err));
  });
}

// Queries the database for a User with the given id and either returns the user's username or throws an error
UserSchema.statics.getUserById = function (userId) {
  return User.findById(userId)
    .exec()
    .then(user => {
      if (user !== null) {
        return { user: user.username };
      }

      throw new Error('userNotFound');
    });
}

/**
 * Hash password using bcrypt before saving to MongoDB
 * Important to use standard function syntax as parameter instead of arrow function due to lexical this
 */
UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => next(err));
});

const User = mongoose.model('User', UserSchema);

module.exports = User;