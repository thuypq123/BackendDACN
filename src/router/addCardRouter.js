const express = require('express');
const router = express.Router();
const postAddCardController = require('../controller/addCardController');

router.post('/', postAddCardController.postAddCard);
router.get('/:id', (req, res) => {
    res.json({message: 'Hello World'});
});

module.exports = router;