const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
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
      console.log(`Can not connect to the database ${err}`);
    }
  );

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '2gb', extended: true }));
app.use(cors());
app.use(helmet());
app.disable('x-powered-by');

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(config.EXP_PORT, () =>
  console.log(`LISTENING ON PORT ${config.EXP_PORT}`)
);
