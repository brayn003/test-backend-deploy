const mongoose = require('mongoose');

const Author = require('./Author');

const schema = new mongoose.Schema({
  name: 'string',
  yearOfRelease: 'number',
  dateWritten: 'date',
  author: { type: 'ObjectId', ref: Author }
});

const model = mongoose.model('Book', schema);
module.exports = model;