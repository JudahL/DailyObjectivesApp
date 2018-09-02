const errors = require('./errors');

function handleError(err, req, res, next) {
  const error = formatError(err);

  console.log(error.message);

  res.status(errors[error.message].status || 500);
  res.json(errors[error.message].message || error.message);
}

function formatError(err) {
  if (!err.message) {
    return new Error(err);
  }

  return err;
}

module.exports = handleError;