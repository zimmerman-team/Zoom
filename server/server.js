const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/config');
const path = require('path');
const router = require('./router');
const app = express();
mongoose.set('useCreateIndex', true);
mongoose
  .connect(process.env.REACT_APP_MONGO_DB, {
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

app.use('/api/static', express.static(path.join(__dirname, '/static')));

// launch our backend into a port
app.listen(process.env.REACT_APP_BACKEND_PORT, () => {
  console.log(process.env.REACT_APP_PROJECT_URL.slice(0, 4));
  console.log(`LISTENING ON PORT ${process.env.REACT_APP_BACKEND_PORT}`);
});
