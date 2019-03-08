module.exports = {
  handleError: function handleError(res, error) {
    console.error(error);
    return res({
      error: error.name,
      message: error.message
    });
  }
};
