const express = require('express');
const router = express.Router();

/* controllers */
const ChartController = require('./controllers/ChartController');
const UserController = require('./controllers/UserController');
const DatasetController = require('./controllers/DatasetController');
const EmailController = require('./controllers/EmailController');

// so this should only be uncommented and used if you have
// a clean database, and just need some data init
// NOTE: the seeded data may not be used for the actual frontend to work
// unless you adjust it in some proper way
// router.get('/seedChart', ChartController.seedChart);

/* -------------- CHART CONTROLLER START ------------------------ */
// gets user chart with a specified chart id, and user id ofcourse
router.get('/getChart', ChartController.get);

// gets all public charts
router.get('/getPublicCharts', ChartController.getPublic);

// gets one public chart
router.get('/getOnePublicChart', ChartController.getOnePublic);

// gets all user charts and team charts
router.get('/getAllCharts', ChartController.getAll);

// gets all team charts
router.get('/getTeamFeedCharts', ChartController.getTeamFeedCharts);

router.post('/updateCreateChart', ChartController.updateCreate);

router.post('/updateChart', ChartController.update);

router.post('/deleteChart', ChartController.delete);
/* -------------- CHART CONTROLLER END ------------------------ */

/* -------------- USER CONTROLLER START ----------------------- */

router.get('/getUser', UserController.getUser);

router.post('/updateProfile', UserController.updateProfile);

router.post('/addNewUser', UserController.addNewUser);

router.post('/updateUser', UserController.updateUser);

router.post('/updateUserByAdmin', UserController.updateUserByAdmin);

router.post('/updateUsersTeam', UserController.updateUsersTeam);

router.post('/deleteUser', UserController.deleteUser);

/* -------------- USER CONTROLLER END ------------------------- */

/* -------------- DATASET CONTROLLER START ----------------------- */

router.get('/getDataset', DatasetController.getDataset);

router.get('/getOwnerDatasets', DatasetController.getOwnerDatasets);

router.post('/updateTeam', DatasetController.updateTeam);

router.post('/updatePublic', DatasetController.updatePublic);

router.post('/addNewDataset', DatasetController.addNewDataset);

router.post('/updateDataset', DatasetController.updateDataset);

router.delete('/deleteDataset', DatasetController.deleteDataset);

/* -------------- DATASET CONTROLLER END ------------------------- */

/* -------------- EMAIL CONTROLLER START ----------------------- */

router.get('/sendEmail', EmailController.sendMail);

/* -------------- EMAIL CONTROLLER END ------------------------- */

module.exports = router;
