const express = require('express');
const HttpStatus = require('http-status-codes');

const router = express.Router();

const api = require('./api.route');

router.use('/api', api);

// catch 404 and forward to error handler
router.use((req, res, next) => {
  const err = new Error('Url not found');
  err.status = HttpStatus.NOT_FOUND;
  next(err);
});

// error handler
router.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
  res.send('error');
});

module.exports = router;
