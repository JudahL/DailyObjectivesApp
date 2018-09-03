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
UserSchema.statics.authenticate = async function (username, password) {
  const user = await User.findOne({ username: username });

  if (!user) {
    throw new Error('wrongUsername');
  }

  // Compare the provided password with the stored and hashed password
  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    throw new Error('wrongPassword');
  }

  return user;
}

// Queries the database for a User with the given id and either returns the user's username or throws an error
UserSchema.statics.getUserById = async function (userId) {
  const user = await User.findById(userId);

  if (user === null) {
    throw new Error('userNotFound');
  }

  return { user: user.username };
}

/**
 * Hash password using bcrypt before saving to MongoDB
 * Important to use standard function syntax as parameter instead of arrow function due to lexical this
 */
UserSchema.pre('save', async function (next) {
  const user = this;

  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;