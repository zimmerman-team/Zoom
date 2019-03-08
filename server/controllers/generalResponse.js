module.exports = {
  handleError: function(res, error) {
    console.error('Server error', error);
    return res({
      error: error.name,
      message: error.message
    });
  }
};
