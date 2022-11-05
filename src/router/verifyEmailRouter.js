const express = require('express');
const router = express.Router();
const verifyController = require('../controller/verifyController');

router.get('/', verifyController.getVerify);


module.exports = router;