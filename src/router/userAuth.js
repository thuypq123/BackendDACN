const express = require('express');
const userAuthController = require('../controller/userAuthController');
const router = express.Router();

router.post('/login', userAuthController.postLogin);
router.post('/Register', userAuthController.postRegister);
router.post('/verify', userAuthController.postSendMail);

module.exports = router;