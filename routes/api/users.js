const express = require('express');
const { userRegisterPost, userSignInPost, userSignOutPost, userGet } = require('../../controllers/UsersController');

const router = express.Router();

/**
 * '/api/users' routes:
 */

router.get('/get', userGet);

router.post('/register', userRegisterPost);

router.post('/signin', userSignInPost);

router.post('/signout', userSignOutPost);




module.exports = router;
