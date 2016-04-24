'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tasks');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var TaskSchema = new mongoose.Schema({
  _id: String,
  title: {type: String, required: [true, 'No title? Really dude?']},
  description: String,
  dueDate: {type: Date, required: [true, 'If you don\'t know when this is due for use another app']},
  reminder: {type: Boolean, default: false},
  completed: {type: Boolean, default: false},
  dateCreated: {type: Date, default: Date.now},
  dateUpdated: {type: Date, default: Date.now},
  reminderDate: Date
});

exports.Task = mongoose.model('Task', TaskSchema);