import Chart from './api/Chart';

module.exports = function(app) {
  app.use('/api/chart', Chart);
};
