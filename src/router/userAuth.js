const express = require('express');
const userAuthController = require('../controller/userAuthController');
const router = express.Router();

router.post('/login', userAuthController.postLogin);
router.post('/Register', userAuthController.postRegister);

module.exports = router;