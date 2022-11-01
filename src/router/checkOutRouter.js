const express = require('express');
const router = express.Router();
const checkOutController = require('../controller/checkOutController');

router.post('/', checkOutController.postInforCheckouts);

module.exports = router;