const ObjectivesList = require('../models/ObjectivesList');
const Objective = require('../models/Objective');
const User = require('../models/User');

exports.getObjectivesListByUserId = function (userId) {
  return new Promise(function (resolve, reject) {
    if (!userId) {
      return reject('sessionNotFound');
    }

    User.getUserById(userId)
      .then(user => ObjectivesList.getUserObjectivesWithUsername(user))
      .then(userObjectives => {
        resolve(userObjectives);
      })
      .catch(err => reject(err));
  });
};

exports.addNewObjective = function (userId, objectivesData) {
  return new Promise(function (resolve, reject) {
    if (!userId) {
      return reject('sessionNotFound');
    }

    //Ensure the request has provided all the required info
    if (!objectivesData.text || !objectivesData.colour) {
      return reject('fieldsMustBeFilled');
    }

    User.getUserById(userId)
      .then(ObjectivesList.getUserObjectivesWithUsername)
      .then(userObjectives => {
        if (!userObjectives) return reject('objectivesNotFound');

        const newObjective = Objective.createAndReturnNewObjective(objectivesData);

        const objective = ObjectivesList.saveObjective(userObjectives, newObjective);

        resolve(objective);
      })
      .catch(err => reject(err));
  });
}

exports.updateObjective = function (userId, objectiveId, objectiveData) {
  return new Promise(function (resolve, reject) {
    if (!userId) {
      return reject('sessionNotFound');
    }

    User.getUserById(userId)
      .then(ObjectivesList.getUserObjectivesWithUsername)
      .then(userObjectives => {
        if (!userObjectives) return reject('objectivesNotFound');

        const objective = userObjectives.objectives.id(objectiveId);

        if (!objective) {
          return reject('objectiveNotFound');
        }

        objective.set(objectiveData);
        objective.set({ lastModifiedDate: Date.now() });

        // Explicitly telling mongoose that the property lastModifiedDate has been modified
        // as Date methods aren't hooked into the mongoose change tracking logic
        objective.markModified('lastModifiedDate');

        userObjectives.save()
          .then(() => resolve(objective))
          .catch(err => reject(err));
      })
      .catch(err => {
        reject(err)
      });
  });
}


exports.deleteObjective = function (userId, objectiveId) {
  return new Promise(function (resolve, reject) {
    if (!userId) return reject('sessionNotFound');

    User.getUserById(userId)
      .then(ObjectivesList.getUserObjectivesWithUsername)
      .then(userObjectives => {
        if (!userObjectives) return reject('objectivesNotFound');

        const objective = userObjectives.objectives.id(objectiveId);

        if (!objective) {
          return reject('objectiveNotFound');
        }

        objective.remove();

        userObjectives.save()
          .then(resolve('success'))
          .catch(err => reject(err));
      })
      .catch(err => {
        reject(err)
      });
  });
}