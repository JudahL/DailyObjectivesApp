const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectiveSchema = new Schema({
  text: String,
  colour: String,
  isChecked: Boolean,
  lastModifiedDate: Date,
});

module.exports.createAndReturnNewObjective = function (objectiveData) {
  const newObjective = {
    text: objectiveData.text,
    colour: objectiveData.colour,
    isChecked: objectiveData.isChecked || false,
    lastModifiedDate: Date.now(),
  }

  return newObjective;
}

module.exports.Objective = ObjectiveSchema;