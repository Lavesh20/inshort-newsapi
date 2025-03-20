// const express = require('express');
// const { userSignup, userLogin } = require('../controllers/userAuthController');

// const router = express.Router();

// router.post('/register', userSignup);
// router.post('/signin', userLogin);

// module.exports = router;

const express = require('express');
const { userSignup, userLogin } = require('../controllers/userAuthController');

const router = express.Router();

router.post('/register', userSignup);
router.post('/signin', userLogin);

module.exports = router;
