const mongoose = require('mongoose');
const { Objective } = require('./Objective');

const Schema = mongoose.Schema;

const ObjectivesListSchema = new Schema({
  user: {
    unique: true,
    type: String,
    required: true,
  },
  objectives: [Objective],
});

// Queries for a users Objectives List based on the users username
ObjectivesListSchema.statics.findObjectivesListWithUsername = function (user) {
  return ObjectivesList.findOne(user)
    .exec()
    .then(userObjectives => {
      if (!userObjectives && user) {
        // return a new objectives list with the user's details
        // The objectives array will be empty by default
        return new ObjectivesList(userObjectives.user);
      }

      return userObjectives;
    });
}

// Adds a new objective to the objectives list and returns a promise with the added objective as a parameter to the resolve function if successful
ObjectivesListSchema.statics.addNewObjective = function (userObjectives, newObjective) {
  const numberOfObjectives = userObjectives.objectives.push(newObjective);

  return userObjectives.save()
    .then(() => userObjectives.objectives[numberOfObjectives - 1]);
}

/**
 * Handles the daily resetting of objectives.
 * 
 * When retrieving a users objectives list check if the last modified date
 * for each objective is before the reset point of the current day. 
 * If it is then reset the objective to be unchecked before returning it to the client.
 */
ObjectivesListSchema.post('findOne', result => {
  if (!result) return;

  //Set up the current days reset point
  var currentDate = new Date();
  if (currentDate.getHours() < 4) {
    currentDate.setDate(currentDate.getDate() - 1);
  }
  currentDate.setHours(4, 0, 0);

  //Check each objective to see if it was last modified before the reset point
  //If it was then reset the isChecked property
  for (var i = 0; i < result.objectives.length; i++) {
    if (result.objectives[i].lastModifiedDate < currentDate && result.objectives[i].isChecked) {
      result.objectives[i].isChecked = false;
    }
  }
});

const ObjectivesList = mongoose.model('Objectives', ObjectivesListSchema);

module.exports = ObjectivesList;