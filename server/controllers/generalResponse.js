module.exports = {
  handleError: (res, error, status = 520) => {
    // its also very useful to just console log
    // these random errors. for when we don't know
    // the status code, cause mostly it
    // is an internal server error or sth like that
    if (status === 520) {
      const today = new Date();

      const date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();

      const time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

      console.log(
        '-----------------------------TIME-------------------------------'
      );
      console.log(`${date} - ${time}`);
      console.log(
        '-----------------------------TIME-------------------------------'
      );
      console.log('chartError', error);
    }
    res.status(status).send(error);
  }
};
