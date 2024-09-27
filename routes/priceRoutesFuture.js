const express = require('express');
const path = require('path');
const { getPrice } = require('../controllers/priceControllerFuture');

const router = express.Router();

// Serve the HTML file for GET requests
router.get('/get-price-future', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/find1.html'));
});

// Handle POST requests
router.post('/get-price-future', getPrice);

module.exports = router;
