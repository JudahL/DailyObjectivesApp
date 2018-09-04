const ObjectivesList = require('../models/ObjectivesList');
const Objective = require('../models/Objective');
const User = require('../models/User');

/**
 * Returns the users list of objectives based on the given users id
 * @param {number} userId - The id of the user whose objectives should be searched for
 */
exports.getObjectivesListByUserId = async function (userId) {
  const userObjectivesList = await GetUsersObjectivesListById(userId);

  return (userObjectivesList);
};

/**
 * Adds a new objective to the users list of objectives with the provided objective data
 * @param {number} userId - The id of the user who is adding the objective
 * @param {Object} objectiveData - The data with which to build the new objective
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
 * @param {number} userId - The id of the user who is updating an objective
 * @param {number} objectiveId - The id of the objective to update
 * @param {Object} objectiveData - The updated data with which to update the objective with
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
 * @param {number} userId - The id of the user who is deleting an objective
 * @param {number} objectiveId - The id of the objective to remove
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

/**
 * Searchs for a users objectives list and returns it if successful
 * @param {number} userId - The id of the user whose objectives should be returned
 */
async function GetUsersObjectivesListById(userId) {
  if (!userId) {
    throw new Error('userNotSignedIn');
  }

  const user = await User.findUserById(userId);

  if (!user) {
    throw new Error('userNotFound');
  }

  const userObjectivesList = await ObjectivesList.findObjectivesListWithUsername({ username: user.username });

  return userObjectivesList;
}

/**
 * Searchs for an objective within a given objectives list and returns it if successful
 * @param {Object} userObjectivesList - The objectives list to search
 * @param {number} objectiveId - The id of the objective to return
 */
function GetObjectiveInObjectivesList(userObjectivesList, objectiveId) {
  const objective = userObjectivesList.objectives.id(objectiveId);

  if (!objective) {
    throw new Error('objectiveNotFound');
  }

  return objective;
}