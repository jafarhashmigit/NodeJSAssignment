"use strict";

var mongoose = require('mongoose');
var categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});
module.exports = mongoose.model('Category', categorySchema);