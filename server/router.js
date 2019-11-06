const express = require('express');
const router = express.Router();
const fs = require('fs');
const url = require('url');
const http = require('http');
const https = require('https');
const path = require('path');

const cryptoJs = require('crypto-js');

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

/* controllers */
const ChartController = require('./controllers/ChartController');
const UserController = require('./controllers/UserController');
const DatasetController = require('./controllers/DatasetController');
const EmailController = require('./controllers/EmailController');
const AuthUserController = require('./controllers/AuthUserController');
const AuthGroupController = require('./controllers/AuthGroupController');
const AuthRoleController = require('./controllers/AuthRoleController');

/* -------------- MIDDLEWARE START ------------------------ */

router.use((req, res, next) => {
  // so here basically we'll decrypt the values retrieved from the frontend

  if (req.path !== '/redirectToHome') {
    // this decrypts the get request values if there are any
    if (
      req.query.constructor === Object &&
      Object.entries(req.query).length !== 0
    ) {
      req.query = JSON.parse(
        cryptoJs.AES.decrypt(
          req.query.payload.toString(),
          process.env.REACT_APP_ENCRYPTION_SECRET
        ).toString(cryptoJs.enc.Utf8)
      );
    }

    // and this decrypts the post request values if there are any
    if (
      req.body.constructor === Object &&
      Object.entries(req.body).length !== 0
    ) {
      req.body = JSON.parse(
        cryptoJs.AES.decrypt(
          req.body.payload.toString(),
          process.env.REACT_APP_ENCRYPTION_SECRET
        ).toString(cryptoJs.enc.Utf8)
      );
    }
  }

  next();
});

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
    jwksUri: `https://${process.env.REACT_APP_AUTH_CUSTOM_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.REACT_APP_CLIENT_ID,
  issuer: `https://${process.env.REACT_APP_AUTH_CUSTOM_DOMAIN}/`,
  algorithms: ['RS256']
});

/* -------------- MIDDLEWARE END ------------------------ */

/* -------------- CHART CONTROLLER START ------------------------ */

// This is the test endpoint for user authentication with auth0
// router.get('/getTest', checkJwt, ChartController.test);

// gets user chart with a specified chart id, and user id ofcourse
router.get('/getChart', checkJwt, ChartController.get);

// gets all public charts
router.get('/getPublicCharts', ChartController.getPublic);

// gets one public chart
router.get('/getOnePublicChart', ChartController.getOnePublic);

// gets all user charts and team charts
router.get('/getAllCharts', checkJwt, ChartController.getAll);

router.post('/updateCreateChart', checkJwt, ChartController.updateCreate);

router.post('/duplicateChart', checkJwt, ChartController.duplicateById);

router.post('/deleteChart', checkJwt, ChartController.delete);

// deletes all of users archived charts
router.delete('/emptyChartTrash', checkJwt, ChartController.emptyTrash);

// router.get('/rewrite', ChartController.rewriteGeojsonToTiles);
/* -------------- CHART CONTROLLER END ------------------------ */

/* -------------- USER CONTROLLER START ----------------------- */

router.get('/getUser', checkJwt, UserController.getUser);

router.post('/updateProfile', checkJwt, UserController.updateProfile);

/* -------------- USER CONTROLLER END ------------------------- */

/* -------------- DATASET CONTROLLER START ----------------------- */

router.get('/getOwnerDatasets', checkJwt, DatasetController.getOwnerDatasets);

router.get('/getDatasetIds', checkJwt, DatasetController.getDatasetIds);

router.get('/getDataset', checkJwt, DatasetController.getDataset);

router.post('/updateTeam', checkJwt, DatasetController.updateTeam);

router.post('/updatePublic', checkJwt, DatasetController.updatePublic);

router.post('/addNewDataset', checkJwt, DatasetController.addNewDataset);

router.post('/updateDataset', checkJwt, DatasetController.updateDataset);

router.delete('/deleteDataset', checkJwt, DatasetController.deleteDataset);

/* -------------- DATASET CONTROLLER END ------------------------- */

/* -------------- EMAIL CONTROLLER START ----------------------- */

router.get('/sendEmail', EmailController.sendMail);

/* -------------- EMAIL CONTROLLER END ------------------------- */

/* -------------- AUTH CONTROLLER START ----------------------- */

router.get('/getUserGroup', checkJwt, AuthGroupController.getUserGroup);

router.get('/getUserRole', checkJwt, AuthRoleController.getUserRole);

router.get('/getAllUsers', checkJwt, AuthUserController.getAllUsers);

router.get('/getUserGroups', checkJwt, AuthGroupController.getUserGroups);

router.get('/getUserRoles', checkJwt, AuthRoleController.getUserRoles);

router.post('/addUserToGroup', checkJwt, AuthGroupController.addUserToGroup);

router.get('/getGroup', checkJwt, AuthGroupController.getGroup);

router.post('/editGroup', checkJwt, AuthGroupController.editGroup);

router.delete('/deleteGroup', checkJwt, AuthGroupController.deleteGroup);

router.get('/getUserFromAuth', checkJwt, AuthUserController.getUser);

router.delete('/deleteUser', checkJwt, AuthUserController.deleteUser);

router.post('/editUser', checkJwt, AuthUserController.editUser);

router.post('/addUser', checkJwt, AuthUserController.addUser);

router.post('/addGroup', checkJwt, AuthGroupController.addGroup);

/* -------------- AUTH CONTROLLER END ----------------------- */

/* -------------- MISCELLANEOUS START ----------------------- */

router.get('/redirectToHome', (req, res) => {
  res.redirect(`${process.env.REACT_APP_PROJECT_URL}/home/#`);
});

// basically this guy will download a geojson file from DUCT
// save it in this express backend, and then it will be served
// to the mapbox of this frontend, this is mainly used
// for development purposes, to work around cors issues
// generated by mapbox
// this will also be used to delete them files
router.get('/loadTiles', (req, res) => {
  const { prevTiles, tileUrl } = req.query;

  if (prevTiles) {
    const fullPathRem = path.join(__dirname, '/static/', prevTiles);
    if (fs.existsSync(fullPathRem)) {
      fs.unlinkSync(fullPathRem);
    }
  }

  if (tileUrl) {
    const fileName = url
      .parse(tileUrl)
      .pathname.split('/')
      .pop();

    const pathToFile = '/static/'.concat(fileName);

    const urlToFile = '/api'.concat(pathToFile);

    const fullPath = path.join(__dirname, pathToFile);

    const file = fs.createWriteStream(fullPath, {
      flags: 'w'
    });

    const fetchToUse = process.env.NODE_ENV === 'development' ? http : https;

    fetchToUse.get(tileUrl, fileRes => {
      fileRes
        .on('data', data => {
          file.write(data);
        })
        .on('end', () => {
          file.end();
          res.send(urlToFile);
        });
    });
  } else {
    res.send('File deleted');
  }
});

/* -------------- MISCELLANEOUS END ----------------------- */

/* -------------- SERVING MB TILES START ------------------ */
const MBTiles = require('@mapbox/mbtiles');

// Enable CORS and set correct mime type/content encoding
const header = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/x-protobuf',
  'Content-Encoding': 'gzip'
};

// Route which handles requests like the following: /<mbtiles-name>/0/1/2.pbf
router.get('/mbtiles/:tileUrl/:z/:x/:y.*', (req, res) => {
  let tilePath = decodeURIComponent(req.params.tileUrl);

  if (tilePath.indexOf('/api') !== -1) {
    tilePath = tilePath.substring(4);
  }

  const fullPath = path.join(__dirname, tilePath);

  new MBTiles(fullPath, (err, mbtiles) => {
    mbtiles.getTile(
      req.params.z,
      req.params.x,
      req.params.y,
      (tileErr, tile, headers) => {
        if (tileErr) {
          res.set({ 'Content-Type': 'text/plain' });
          res.status(404).send('Tile rendering error: ' + tileErr + '\n');
        } else {
          res.set(header);
          res.send(tile);
        }
      }
    );
    if (err) console.log('error opening database');
  });
});
/* -------------- SERVING MB TILES END -------------------- */

module.exports = router;
