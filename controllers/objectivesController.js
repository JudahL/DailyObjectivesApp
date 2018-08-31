const ObjectivesList = require('../models/ObjectivesList');
const User = require('../models/User');

/**
 * GET
 * Find users objectives list based on session id and return the objectives in the response
 */
exports.objectives_get = function (req, res, next) {
  if (!req.session.userId) return next(notFoundError('Session'));

  User.getUserById(req.session.userId)
    .then(user => ObjectivesList.getUserObjectivesWithUsername(user))
    .then(objectives => {
      return res.json(objectives.objectives);
    })
    .catch(err => next(err));
};

/**
 * POST
 * Add a new objective to users objectives list and return the objective in the response if successful
 */
exports.objectivesAddNew_post = function (req, res, next) {
  if (!req.session.userId) return next(notFoundError('Session'));

  User.getUserById(req.session.userId)
    .then(user => ObjectivesList.getUserObjectivesWithUsername(user))
    .then(userObjectives => {
      if (!userObjectives.objectives) {
        // return a new objectives list with the user's details
        // The objectives array will be empty by default
        return new ObjectivesList(userObjectives.user);
      } else {
        return userObjectives.objectives;
      }
    })
    .then(userObs => {
      if (!userObs) throw new notFoundError('UserObjectives');

      const newObjective = createAndReturnNewObjective(req.body);

      if (newObjective === null) {
        const err = new Error('Incorrect details supplied');
        err.status = 400;
        return next(err);
      }

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

  User.getUserById(req.session.userId)
    .then(user => ObjectivesList.getUserObjectivesWithUsername(user))
    .then(userObjectives => {
      if (!userObjectives.objectives) throw new notFoundError('User Objectives');

      const objective = userObjectives.objectives.objectives.id(req.params.id);

      objective.set(req.body);
      objective.set({ lastModifiedDate: Date.now() });

      // Explicitly telling mongoose that the property lastModifiedDate has been modified
      // as Date methods aren't hooked into the mongoose change tracking logic
      objective.markModified('lastModifiedDate');

      userObjectives.objectives.save(err => {
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

  User.getUserById(req.session.userId)
    .then(user => ObjectivesList.getUserObjectivesWithUsername(user))
    .then(userObjectives => {
      if (!userObjectives.objectives) throw new notFoundError('User Objectives');

      const objective = userObjectives.objectives.objectives.id(req.params.id);

      if (objective) {
        objective.remove();

        userObjectives.objectives.save(err => {
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

// Queries for a users Objectives List based on the users userId
function getUserObjectivesWithUserId(userId) {
  return User.getUserById(userId)
    .then(ObjectivesList.getUserObjectivesWithUsername);
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
