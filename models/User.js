const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema =  new Schema({
  name: String,
  age: Number,
  gender: String,
  hobby: String,
  job: String,
  password: String,
  cellphone: String
});

module.exports = mongoose.model('User', UserSchema);
