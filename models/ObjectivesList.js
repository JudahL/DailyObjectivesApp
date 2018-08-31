const mongoose = require('mongoose');
const ObjectiveSchema = require('./Objective');

const Schema = mongoose.Schema;

const ObjectivesListSchema = new Schema({
  user: {
    unique: true,
    type: String,
    required: true,
  },
  objectives: [ObjectiveSchema],
});

// Queries for a users Objectives List based on the users username
ObjectivesListSchema.statics.getUserObjectivesWithUsername = function (user) {
  return ObjectivesList.findOne(user)
    .exec()
    .then(userObjectives => {
      return { objectives: userObjectives, user: user };
    });
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