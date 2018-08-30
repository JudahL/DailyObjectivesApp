const express = require('express');
const { userRegister_post, userSignIn_post, userSignOut_post, user_get } = require('../../controllers/usersController');

const router = express.Router();

module.exports = router;

/**
 * '/api/users' routes:
 */

router.get('/get', user_get);

router.post('/register', userRegister_post);

router.post('/signin', userSignIn_post);

router.post('/signout', userSignOut_post);
