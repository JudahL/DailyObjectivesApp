const express = require('express');
const { userRegisterPost, userSignInPost, userSignOutPost, userGet } = require('../../controllers/usersController');

const router = express.Router();

module.exports = router;

/**
 * '/api/users' routes:
 */

router.get('/get', userGet);

router.post('/register', userRegisterPost);

router.post('/signin', userSignInPost);

router.post('/signout', userSignOutPost);
