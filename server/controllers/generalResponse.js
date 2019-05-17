module.exports = {
  handleError: (res, error, status = 520) => {
    res.status(status).send(error);
  }
};
