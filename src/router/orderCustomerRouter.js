const express = require('express');
const router = express.Router();
const orderCustomerController = require('../controller/orderCustomerController');

router.post('/', orderCustomerController.postOrderCustomer);
router.post('/editCard', orderCustomerController.postEditCard);
router.post('/deleteCard', orderCustomerController.postDeleteCard);
module.exports = router;