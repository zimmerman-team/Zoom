const express = require('express');
const router = express.Router();

/* controllers */
const ChartController = require('./controllers/ChartController');

// this is our get method
// this method fetches all available data in our database
router.get('/check', ChartController.check);

module.exports = router;
