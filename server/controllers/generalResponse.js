module.exports = {
  handleError: function(res, error, status = 520) {
    res.status(status).send(error);
  }
};
