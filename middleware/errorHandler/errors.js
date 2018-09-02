const errors = {
  fieldsMustBeFilled: {
    status: 400,
    message: 'All fields must be filled',
  },
  passwordsDoNotMatch: {
    status: 400,
    message: 'Passwords do not match',
  },
  wrongUsernameOrPassword: {
    status: 400,
    message: 'Wrong username or password',
  },
  userNotFound: {
    status: 404,
    message: 'User not found',
  },
  sessionNotFound: {
    status: 404,
    message: 'Session not found',
  },
  objectivesNotFound: {
    status: 404,
    message: 'Objectives not found'
  },
  objectivesNotFound: {
    status: 404,
    message: 'Objective not found'
  },
  11000: {
    status: 400,
    message: 'Username already in use'
  }
}

module.exports = errors;