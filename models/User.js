const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: { type: 'string', unique: true, required: true },
  name: 'string',
  password: { type: 'string', required: true },
  profilePic: { type: 'string' }
});

const model = mongoose.model('User', schema);
module.exports = model;