const express = require('express');
const router = express.Router();

/* controllers */
const ChartController = require('./controllers/ChartController');

// so this should only be uncommented and used if you have
// a clean database, and just need some data init
// NOTE: the seeded data may not be used for the actual frontend to work
// unless you adjust it in some proper way
// router.get('/seedChart', ChartController.seedChart);

router.get('/getChart', ChartController.get);

module.exports = router;
