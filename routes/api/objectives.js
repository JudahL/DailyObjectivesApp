const express = require('express');
const ObjectivesList = require('../../models/ObjectivesList');
const User = require('../../models/User');

const router = express.Router();

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

function handleNotFound(type) {
  const error = new Error(type + ' not found.');
  error.status = 404;
  return error;
}

/**
 * '/api/objectives' routes:
 */
router.get('/', (req, res, next) => {
  if (!req.session.userId) return next(handleNotFound('Session'));

  getUser(req.session.userId)
    .then(user => {
      ObjectivesList.findOne(user)
        .exec()
        .then(objectives => {
          return res.json(objectives);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  if (!req.session.userId) return next(handleNotFound('Session'));

  getUser(req.session.userId)
    .then(user => {
      ObjectivesList.findOne(user)
        .exec()
        .then(userObjectives => {
          if (!userObjectives) {
            // return a new objectives list with the user's details
            // objectives array will be empty by default
            return new ObjectivesList(user);
          } else {
            return userObjectives;
          }
        })
        .then(userObs => {
          if (!userObs) throw new handleNotFound('UserObjectives');

          const newObjective = {
            text: req.body.text,
            colour: req.body.colour,
            isChecked: req.body.isChecked,
            lastModifiedDate: Date.now(),
          }

          return res.json(addObjective(userObs, newObjective));
        })
        .catch(err => next(err));
    });
});

function addObjective(userObjectives, newObjective) {
  const numberOfObjectives = userObjectives.objectives.push(newObjective);
  userObjectives.save();
  return userObjectives.objectives[numberOfObjectives - 1];
}

router.put('/:id', (req, res, next) => {
  //if (!req.session.userId) return next(handleNotFound('Session'));

  getUser(req.session.userId)
    .then(user => {
      return ObjectivesList.findOne(user)
        .exec()
        .then(userObjectives => {
          return userObjectives;
        })
        .catch(err => next(err));
    })
    .then(userObjectives => {
      if (!userObjectives) throw new handleNotFound('ObjectivesList');

      const objective = userObjectives.objectives.id(req.params.id);

      objective.set(req.body);
      objective.set({ lastModifiedDate: Date.now() });
      objective.markModified('lastModifiedDate');

      userObjectives.save(err => {
        if (err) {
          return next(err);
        } else {
          return res.json(userObjectives.objectives.id(req.params.id));
        }
      });
    })
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
  if (!req.session.userId) return next(handleNotFound('Session'));

  getUser(req.session.userId)
    .then(user => {
      ObjectivesList.findOne(user)
        .exec((err, userObjectives) => {
          if (err) {
            return next(err);
          } else {
            if (!userObjectives) throw new handleNotFound('Objective');

            userObjectives.objectives.id(req.params.id).remove();

            userObjectives.save(err => {
              if (err) {
                return next(err);
              } else {
                return res.send('success');
              }
            });
          }
        });
    })
    .catch(err => next(err));
})

module.exports = router;





/**
 * DEPRECATED:
 */

/*
  User.findById(req.session.userId)
    .exec((err, user) => {
      if (err) {
        return next(err);
      } else {
        return { user: user.username };
      }
    })
*/

/*
  if (userObjectives === null) {
    ObjectivesList.create(user, (err, newObjectivesList) => {
      if (err) {
        const error = new Error(err.message);
        return next(error);
      } else {
        return newObjectivesList;
      }
    });
  } else {
    return res.json(addObjective(userObjectives, newObjective));
  }
*/

/*
function initializeObjectivesList(userId, next) {
  const newObjectives = getUser(userId, next);

  // Add a new objectives list to the database
  ObjectivesList.create(newObjectives, (err, newObjectivesList) => {
    if (err) {
      const error = new Error(err.message);
      return next(error);
    } else {
      return newObjectivesList;
    }
  });
}
*/