const express = require('express');
const router = express.Router();
const stripeController = require('../controller/stripeController');

router.post('/create-checkout-session', stripeController.postStripe);
router.post('/webhook',express.raw({type: 'application/json'}),stripeController.postSuccess);

module.exports = router;