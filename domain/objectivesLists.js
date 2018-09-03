const ObjectivesList = require('../models/ObjectivesList');
const Objective = require('../models/Objective');
const User = require('../models/User');

exports.getObjectivesListByUserId = async function (userId) {
  if (!userId) {
    throw new Error('sessionNotFound');
  }

  const user = await User.getUserById(userId);
  const userObjectivesList = await ObjectivesList.findObjectivesListWithUsername(user);

  return (userObjectivesList);
};

exports.addNewObjective = async function (userId, objectiveData) {
  if (!userId) {
    throw new Error('sessionNotFound');
  }

  //Ensure the request has provided all the required info
  if (!objectiveData.text || !objectiveData.colour) {
    throw new Error('fieldsMustBeFilled');
  }

  const user = await User.getUserById(userId);
  const userObjectivesList = await ObjectivesList.findObjectivesListWithUsername(user);

  if (!userObjectivesList) {
    throw new Error('objectivesNotFound');
  }

  const newObjective = Objective.formatObjectiveData(objectiveData);

  return await ObjectivesList.addNewObjective(userObjectivesList, newObjective);
}

exports.updateObjective = async function (userId, objectiveId, objectiveData) {

  if (!userId) {
    return reject('sessionNotFound');
  }

  const user = await User.getUserById(userId);
  const userObjectivesList = await ObjectivesList.findObjectivesListWithUsername(user);

  if (!userObjectivesList) {
    throw new Error('objectivesNotFound');
  }

  const objective = userObjectivesList.objectives.id(objectiveId);

  if (!objective) {
    throw new Error('objectiveNotFound');
  }

  objective.set(objectiveData);
  objective.set({ lastModifiedDate: Date.now() });

  // Explicitly telling mongoose that the property lastModifiedDate has been modified
  // as Date methods aren't hooked into the mongoose change tracking logic
  objective.markModified('lastModifiedDate');

  await userObjectivesList.save();

  return objective;
}

/**
 * Deletes an objective with the given id
 */
exports.deleteObjective = async function (userId, objectiveId) {
  if (!userId) {
    return reject('sessionNotFound');
  }

  const user = await User.getUserById(userId);
  const userObjectivesList = await ObjectivesList.findObjectivesListWithUsername(user);

  if (!userObjectivesList) {
    throw new Error('objectivesNotFound');
  }

  const objective = userObjectivesList.objectives.id(objectiveId);

  if (!objective) {
    throw new Error('objectiveNotFound');
  }

  objective.remove();

  await userObjectivesList.save();

  return ('success');
}