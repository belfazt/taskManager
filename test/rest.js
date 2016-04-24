'use strict';

var assert = require('chai').assert;
var request = require('supertest');

describe('testing API', function() {
	var server;
	before(function () {
	  delete require.cache[require.resolve('../server')];
	  server = require('../server');
	});

	after(function (done) {
	  server.close(done);
	});

	it('GET /tasks', function getAllTheTasks(done) {
		request(server)
		  .get('/tasks')
      .expect('Content-Type', /json/)
      .expect(200, done);
	});

  it('POST /tasks', function createMyAwesomeTask(done) {
    request(server)
      .post('/tasks')
      .type('json')
      .send('{"_id": "myAwesomeId", "title": "Do my architecture homework", "dueDate": "04/26/2016"}')
      .expect('Content-Type', /json/)
      .expect(201, done);
  });

  it('GET /tasks/myAwesomeId', function getMyAwesomeTask(done) {
    request(server)
      .get('/tasks/myAwesomeId')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('PUT /tasks/myAwesomeId', function modifyMyAwesomeTask(done) {
    request(server)
      .put('/tasks/myAwesomeId')
      .type('json')
      .send('{"title": "D0 TH3 FUCK1NG HOM3W0RK", "dueDate": "04/27/2016"}')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('DELET /tasks/myAwesomeId', function deleteMyAwesomeTask(done) {
    request(server)
      .delete('/tasks/myAwesomeId')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

});