'use strict';

var app = require('../server').app;
var assert = require('chai').assert;
var request = require('request');

var port = 5000;
var baseUrl = 'http://localhost:' + port;

describe('hooks', function() {
  before(function() {
    console.log('Starting server on port: ' + port);
    app.listen(port);
  })

  after(function() {
    console.log('Stopping server');
    app.close();
  })
});

describe('tasks', function() {
  describe('#GET', function() {
    it('should return an array holding tasks', function() {
      request.get(baseUrl + '/tasks', function(err, res, body) {
        assert.equal(200, res.statusCode);
        assert.equal('application/json', res.headers['content-type']);
        assert.typeOf(body, 'string');
        assert(body.indexOf('[') > -1);
        assert(body.indexOf(']') > body.indexOf('['));
        assert(body.length >= 2, 'it should at least return []');
        
      });
    });
  });
});

describe('tasks', function() {
  describe('#GET/:id', function() {
    it('should return an array holding tasks', function() {
      request.get(baseUrl + '/tasks/', function(err, res, body) {
        assert.equal(200, res.statusCode);
        assert.equal('application/json', res.headers['content-type']);
        assert.typeOf(body, 'string');
        assert(body.indexOf('[') > -1);
        assert(body.indexOf(']') > body.indexOf('['));
        assert(body.length >= 2, 'it should at least return []');
        
      });
    });
  });
});

describe('tasks', function() {
  describe('#POST', function() {
    it('should return an array at least one task', function() {
      var values = {
          title: "Do my architecture homework",
          dueDate: "04/26/2016"
      };
      request.post({url: baseUrl + '/tasks', json: values}, function(err, res, body) {
        assert.equal(200, res.statusCode);
        assert.equal('application/json', res.headers['content-type']);
        assert.typeOf(body, 'string');
        assert(body.indexOf('[') > -1);
        assert(body.indexOf('Do my architecture homework') > -1);
        assert(body.indexOf(']') > body.indexOf('['));
        assert(body.length >= 2, 'it should at least return []');
      });
      
    });
  });
});