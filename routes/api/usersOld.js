const express = require('express');
const User = require('../../models/User');

const router = express.Router();

/**
 * '/api/users' routes:
 */
router.post('/register', (req, res, next) => {
    if (req.body.username && req.body.password && req.body.passwordConfirm) {

        // Validate 'password' against 'confirm password'
        if (req.body.password !== req.body.passwordConfirm) {
            const err = new Error('PwNoMatch');
            err.status = 400;
            return next(err);
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
        const err = new Error('FieldsMustFilled');
        err.status = 400;
        return next(err);
    }
});

router.post('/signin', (req, res, next) => {
    if (req.body.username && req.body.password) {
        User.authenticate(req.body.username, req.body.password, (error, user) => {
            if (error || !user) {
                const err = new Error('WrongUnOrPw');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.json(user.username);
            }
        });
    } else {
        //If all fields aren't supplied then return an error
        const err = new Error('FieldsMustFilled');
        err.status = 400;
        return next(err);
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
    User.findById(req.session.userId).exec((err, user) => {
        if (err) {
            return next(err);
        } else {
            if (user === null) {
                return res.json('');
            } else {
                return res.json(user.username);
            }
        }
    });
});

module.exports = router;