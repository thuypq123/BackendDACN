const express = require('express');
const router = express.Router();
const checkOutController = require('../controller/checkOutController');

router.post('/', checkOutController.postInforCheckouts);
router.post('/postCheckoutInfo', checkOutController.postCheckoutInfo);

module.exports = router;