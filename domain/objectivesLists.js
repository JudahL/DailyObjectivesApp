const ObjectivesList = require('../models/ObjectivesList');
const Objective = require('../models/Objective');
const User = require('../models/User');

/**
 * Returns the users list of objectives based on the given users id
 */
exports.getObjectivesListByUserId = async function (userId) {
  const userObjectivesList = await GetUsersObjectivesListById(userId);

  return (userObjectivesList);
};

/**
 * Adds a new objective to the users list of objectives with the provided objective data
 */
exports.addNewObjective = async function (userId, objectiveData) {

  //Ensure the request has provided all the required info
  if (!objectiveData.text || !objectiveData.colour) {
    throw new Error('fieldsMustBeFilled');
  }

  const userObjectivesList = await GetUsersObjectivesListById(userId);

  if (!userObjectivesList) {
    throw new Error('objectivesNotFound');
  }

  const newObjective = Objective.formatObjectiveData(objectiveData);

  return await ObjectivesList.addNewObjective(userObjectivesList, newObjective);
}

/**
 * Updates an objective with the provided objective data
 */
exports.updateObjective = async function (userId, objectiveId, objectiveData) {

  const userObjectivesList = await GetUsersObjectivesListById(userId);

  if (!userObjectivesList) {
    throw new Error('objectivesNotFound');
  }

  const objective = GetObjectiveInObjectivesList(userObjectivesList, objectiveId);

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

  const userObjectivesList = await GetUsersObjectivesListById(userId);

  if (!userObjectivesList) {
    throw new Error('objectivesNotFound');
  }

  const objective = GetObjectiveInObjectivesList(userObjectivesList, objectiveId);

  objective.remove();

  await userObjectivesList.save();

  return ('success');
}


async function GetUsersObjectivesListById(userId) {
  if (!userId) {
    throw new Error('sessionNotFound');
  }

  const user = await User.getUserById(userId);
  const userObjectivesList = await ObjectivesList.findObjectivesListWithUsername(user);

  return userObjectivesList;
}

function GetObjectiveInObjectivesList(userObjectivesList, objectiveId) {
  const objective = userObjectivesList.objectives.id(objectiveId);

  if (!objective) {
    throw new Error('objectiveNotFound');
  }

  return objective;
}