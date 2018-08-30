const ObjectivesList = require('../models/ObjectivesList');
const User = require('../models/User');

/**
 * GET
 * Find users objectives list based on session id and return the objectives in the response
 */
exports.objectives_get = function (req, res, next) {
  if (!req.session.userId) return next(notFoundError('Session'));

  getUserObjectivesWithUserId(req.session.userId)
    .then(objectives => {
      return res.json(objectives);
    })
    .catch(err => next(err));
};

/**
 * POST
 * Add a new objective to users objectives list and return the objective in the response if successful
 */
exports.objectivesAddNew_post = function (req, res, next) {
  if (!req.session.userId) return next(notFoundError('Session'));

  getUserObjectivesWithUserId(req.session.userId)
    .then(userObjectives => {
      if (!userObjectives) {
        // return a new objectives list with the user's details
        // The objectives array will be empty by default
        return new ObjectivesList(user);
      } else {
        return userObjectives;
      }
    })
    .then(userObs => {
      if (!userObs) throw new notFoundError('UserObjectives');

      const newObjective = createAndReturnNewObjective(req.body);

      return res.json(addAndReturnObjective(userObs, newObjective));
    })
    .catch(err => next(err));
};

/**
 * PUT
 * Update an existing objective in users objectives list and return the modified objective in the response if successful
 */
exports.objectivesUpdateById_put = function (req, res, next) {
  if (!req.session.userId) return next(notFoundError('Session'));

  getUserObjectivesWithUserId(req.session.userId)
    .then(userObjectives => {
      if (!userObjectives) throw new notFoundError('User Objectives');

      const objective = userObjectives.objectives.id(req.params.id);

      objective.set(req.body);
      objective.set({ lastModifiedDate: Date.now() });

      // Explicitly telling mongoose that the property lastModifiedDate has been modified
      // as Date methods aren't hooked into the mongoose change tracking logic
      objective.markModified('lastModifiedDate');

      userObjectives.save(err => {
        if (!err) {
          res.json(objective);
        } else {
          next(err);
        }
      });
    })
    .catch(err => next(err));
};

/**
 * DELETE
 * Remove an existing objective in users objectives list and return the string 'success' in the response if successful
 */
exports.objectivesDeleteById_delete = function (req, res, next) {
  if (!req.session.userId) return next(notFoundError('Session'));

  getUserObjectivesWithUserId(req.session.userId)
    .then(userObjectives => {
      if (!userObjectives) throw new notFoundError('User Objectives');

      const objective = userObjectives.objectives.id(req.params.id);

      if (objective) {
        objective.remove();

        userObjectives.save(err => {
          if (!err) {
            res.send('success');
          } else {
            next(err);
          }
        });
      } else {
        throw new notFoundError('Objective');
      }
    })
    .catch(err => next(err));
};



/**
 * Query functions:
 * All of these return a promise with the query result as a parameter
 */

// Queries the database for a User with the given id and either returns the user's username or throws a 404 error
function getUser(userId) {
  return User.findById(userId)
    .exec()
    .then(user => {
      if (user !== null) {
        return { user: user.username };
      } else {
        throw new handleNotFound('user');
      }
    })
}

// Queries for a users Objectives List based on the users username
function getUserObjectivesWithUsername(user) {
  return ObjectivesList.findOne(user)
    .exec();
}

// Queries for a users Objectives List based on the users userId
function getUserObjectivesWithUserId(userId) {
  return getUser(userId)
    .then(getUserObjectivesWithUsername);
}


/** 
 * Objective functions:
 */

function createAndReturnNewObjective(objectiveDetails) {
  //Ensure the request has provided all the required info
  if (objectiveDetails.text && objectiveDetails.colour) {
    const newObjective = {
      text: objectiveDetails.text,
      colour: objectiveDetails.colour,
      isChecked: objectiveDetails.isChecked || false,
      lastModifiedDate: Date.now(),
    }

    return newObjective;
  } else {
    return null;
  }
}

function addAndReturnObjective(userObjectives, newObjective) {
  const numberOfObjectives = userObjectives.objectives.push(newObjective);
  userObjectives.save();
  return userObjectives.objectives[numberOfObjectives - 1];
}


/**
 * Error creator functions:
 */

//Creates and returns a new 404 Not Found error
function notFoundError(type) {
  const error = new Error(type + ' not found.');
  error.status = 404;
  return error;
}
