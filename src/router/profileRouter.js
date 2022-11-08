const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

// router.get('/',profileController.getProfile);
router.post('/',profileController.getProfile);
router.post('/updateprofile',profileController.postEditProfile);

module.exports = router;