'use strict';

var Task = require('../models/task').Task;
var uuid = require('node-uuid');

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving task: ' + id);
    Task.findById(id, function(err, task) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(task);
      }
    });
};

exports.findAll = function(req, res) {
    console.log('Retrieving all tasks');
    Task.find(function (err, tasks) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send(tasks);
      }
    });
};

exports.addTask = function(req, res) {
    var task = req.body;    
    console.log('Adding task: ' + JSON.stringify(task));
    if (task._id == undefined) {
      task._id = uuid.v4();
    }
    if (task.reminder && task.reminderDate == undefined) {
      task.reminderDate = Date.now + 86400000
    }
    Task.create(task, function(err, task) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.status(201).send(task);
      }
    });
    
}

exports.updateTask = function(req, res) {
    var id = req.params.id;
    var updatedValues = req.body;
    console.log('Modifying task ' + id + ' with info ' + JSON.stringify(updatedValues));
    Task.findById(id, function(err, task) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        task.dateUpdated = Date.now();
        task.title = updatedValues.title != null ? updatedValues.title : task.title;
        task.reminder = updatedValues.reminder != null ? updatedValues.reminder : task.reminder;
        task.completed = updatedValues.completed != null ? updatedValues.completed : task.completed;
        task.reminderDate = updatedValues.reminderDate != null ? updatedValues.reminderDate : task.reminderDate;
        if (task.description != undefined) {
          task.description = updatedValues.description != null ? updatedValues.description : task.description;
        }
        if (task.reminderDate != undefined) {
          task.reminderDate = updatedValues.reminderDate != null ? updatedValues.reminderDate : task.description;
        }
        task.save(function(err1) {
          if (err1) {
            console.log(err1);
            res.status(500).send(err1);
          } else {
            res.send(task);
          }
        })
      }
    });

}

exports.deleteTask = function(req, res) {
    var id = req.params.id;
    console.log('Deleting task: ' + id);
    Task.findById(id, function(err, task) {
      if (err) {
        res.status(500).send(err);
      } else {
        task.remove();
        res.send(task);
      }
    });
}