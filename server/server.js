const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');

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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(config.EXP_PORT, function() {
  console.log('Server is running on Port: ', config.EXP_PORT);
});
