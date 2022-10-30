const express = require('express');
const router = express.Router();

const detailController = require('../controller/detailController');

router.get('/:id',detailController.getProduct);

module.exports = router;    