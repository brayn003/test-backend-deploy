const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: 'string',
  dateOfBirth: 'date',
  gender: {type: 'string', enum: ['male', 'female', 'others']},
});

const model = mongoose.model('Author', schema);
module.exports = model;