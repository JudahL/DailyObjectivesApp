const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectiveSchema = new Schema({
  text: String,
  colour: String,
  isChecked: Boolean,
  lastModifiedDate: Date,
});

module.exports = ObjectiveSchema;