const express = require('express');
const { getPrice } = require('../controllers/priceController');

const router = express.Router();

router.get('/get-price', (req, res) => {
    res.sendFile('../find.html')
});
router.post('/get-price', getPrice);

module.exports = router;
