const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    price: Number
  });
  
  module.exports = mongoose.model('Mango', userSchema);
  