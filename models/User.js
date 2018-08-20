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
 * Helper function for authenticating user details
 */
UserSchema.statics.authenticate = (username, password, callback) => {
    User.findOne({ username: username })
        .exec((err, user) => {
            //Handle errors
            if (err) {
                return callback(err);
            } else if (!user) {
                const err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }

            //Compare the provided password with the stored password
            bcrypt.compare(password, user.password, (err, result) => {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            });
        })
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