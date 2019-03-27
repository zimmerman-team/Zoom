const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const config = require('./config/config');
const router = require('./router');
const app = express();

mongoose
  .connect(config.DB, {
    useNewUrlParser: true,
    autoIndex: app.get('env') === 'development'
  })
  .then(
    () => {
      console.log('Database is connected');
    },
    err => {
      console.log('Can not connect to the database' + err);
    }
  );

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// append /api for our http requests
app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// launch our backend into a port
app.listen(config.EXP_PORT, () =>
  console.log(`LISTENING ON PORT ${config.EXP_PORT}`)
);
