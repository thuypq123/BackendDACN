const express = require('express');
const router = express.Router();
const resetMailController = require('../controller/resetMailController');

router.post('/', resetMailController.postResetMail);

module.exports = router; 