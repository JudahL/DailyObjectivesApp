const errors = require('./errors');

function handleError(err, req, res, next) {
  const error = formatError(err);

  console.log(error);

  res.status((errors[error.message] && errors[error.message].status) || 500);
  res.json((errors[error.message] && errors[error.message].message) || error.message);
}

function formatError(err) {
  if (!err) {
    return new Error('An unknown error has occured');
  }

  // Check if the error is a mongoError, if so use the code as an error message
  if (err.name && err.name === 'MongoError') {
    return new Error(err.code.toString());
  }

  if (!err.message) {
    return new Error(err);
  }

  return err;
}

module.exports = handleError;