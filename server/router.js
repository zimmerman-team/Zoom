const express = require('express');
const router = express.Router();

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

/* controllers */
const ChartController = require('./controllers/ChartController');
const UserController = require('./controllers/UserController');
const DatasetController = require('./controllers/DatasetController');
const EmailController = require('./controllers/EmailController');
const AuthController = require('./controllers/AuthController');

// TODO this still needs to be set up properly currently getting some error when doing an axios call
// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 200,
    jwksUri: `https://${
      process.env.REACT_APP_AUTH_CUSTOM_DOMAIN
    }/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.REACT_APP_CLIENT_ID,
  issuer: `https://${process.env.REACT_APP_AUTH_CUSTOM_DOMAIN}/`,
  algorithms: ['RS256']
});

// So this is how the call would be done on the frontend
// axios
//   .get('/api/getTest', {
//     headers: {
//       Authorization: `Bearer ${this.props.auth0Client.getIdToken()}`
//     }
//   })
//   .then(result => console.log(result));

// so this should only be uncommented and used if you have
// a clean database, and just need some data init
// NOTE: the seeded data may not be used for the actual frontend to work
// unless you adjust it in some proper way
// router.get('/seedChart', ChartController.seedChart);

/* -------------- CHART CONTROLLER START ------------------------ */

// This is the test endpoint for user authentication with auth0
// router.get('/getTest', checkJwt, ChartController.test);

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

router.post('/duplicateChart', ChartController.duplicateById);

router.post('/updateChart', ChartController.update);

router.post('/deleteChart', ChartController.delete);

// deletes all of users archived charts
router.delete('/emptyChartTrash', ChartController.emptyTrash);
/* -------------- CHART CONTROLLER END ------------------------ */

/* -------------- USER CONTROLLER START ----------------------- */

router.get('/getUser', UserController.getUser);

router.post('/updateProfile', UserController.updateProfile);

router.post('/addNewUser', UserController.addNewUser);

router.post('/updateUser', UserController.updateUser);

router.post('/updateUserByAdmin', UserController.updateUserByAdmin);

router.post('/updateUsersTeam', UserController.updateUsersTeam);

router.post('/deleteUser', UserController.deleteUser);

router.post('/updateTeamAndUsersOfIt', UserController.updateTeamAndUsersOfIt);

router.post('/deleteTeam', UserController.deleteTeam);

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

router.get('/redirectToHome', (req, res) => {
  res.redirect(`${process.env.REACT_APP_PROJECT_URL}/home/#`);
});

router.get('/getUserGroup', checkJwt, AuthController.getUserGroup);

router.get('/getUserRole', checkJwt, AuthController.getUserRole);

router.get('/getAllUsers', checkJwt, AuthController.getAllUsers);

router.get('/getUserGroups', checkJwt, AuthController.getUserGroups);

router.get('/getUserRoles', checkJwt, AuthController.getUserRoles);

router.post('/addUserToGroup', checkJwt, AuthController.addUserToGroup);

router.get('/getGroup', checkJwt, AuthController.getGroup);

router.get('/editGroup', checkJwt, AuthController.editGroup);

router.get('/getUserFromAuth', checkJwt, AuthController.getUser);

module.exports = router;
