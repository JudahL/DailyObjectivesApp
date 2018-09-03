const ObjectivesList = require('../models/ObjectivesList');
const Objective = require('../models/Objective');
const User = require('../models/User');

exports.getObjectivesListByUserId = function (userId) {
  return new Promise(function (resolve, reject) {
    if (!userId) {
      return reject('sessionNotFound');
    }

    User.getUserById(userId)
      .then(ObjectivesList.findObjectivesListWithUsername)
      .then(userObjectives => resolve(userObjectives))
      .catch(err => reject(err));
  });
};

exports.addNewObjective = function (userId, objectiveData) {
  return new Promise(function (resolve, reject) {
    if (!userId) {
      return reject('sessionNotFound');
    }

    //Ensure the request has provided all the required info
    if (!objectivesData.text || !objectiveData.colour) {
      return reject('fieldsMustBeFilled');
    }

    User.getUserById(userId)
      .then(ObjectivesList.findObjectivesListWithUsername)
      .then(userObjectives => {
        if (!userObjectives) {
          throw new Error('objectivesNotFound');
        }

        const newObjective = Objective.formatObjectiveData(objectiveData);

        return ObjectivesList.addNewObjective(userObjectives, newObjective);
      })
      .then(resolve)
      .catch(err => reject(err));
  });
}

exports.updateObjective = function (userId, objectiveId, objectiveData) {
  return new Promise(function (resolve, reject) {
    if (!userId) {
      return reject('sessionNotFound');
    }

    User.getUserById(userId)
      .then(ObjectivesList.findObjectivesListWithUsername)
      .then(userObjectives => {
        if (!userObjectives) {
          throw new Error('objectivesNotFound');
        }

        const objective = userObjectives.objectives.id(objectiveId);

        if (!objective) {
          throw new Error('objectiveNotFound');
        }

        objective.set(objectiveData);
        objective.set({ lastModifiedDate: Date.now() });

        // Explicitly telling mongoose that the property lastModifiedDate has been modified
        // as Date methods aren't hooked into the mongoose change tracking logic
        objective.markModified('lastModifiedDate');

        return userObjectives.save()
          .then(() => resolve(objective));
      })
      .catch(err => reject(err));
  });
}

/**
 * Deletes an objective with the given id
 */
exports.deleteObjective = function (userId, objectiveId) {
  return new Promise(function (resolve, reject) {
    if (!userId) {
      return reject('sessionNotFound');
    }

    User.getUserById(userId)
      .then(ObjectivesList.getUserObjectivesWithUsername)
      .then(userObjectives => {
        if (!userObjectives) {
          throw new Error('objectivesNotFound');
        }

        const objective = userObjectives.objectives.id(objectiveId);

        if (!objective) {
          throw new Error('objectiveNotFound');
        }

        objective.remove();

        return userObjectives.save()
      })
      .then(() => resolve('success'))
      .catch(err => reject(err));
  });
}