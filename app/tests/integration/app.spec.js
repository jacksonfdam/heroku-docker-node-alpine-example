'use strict';

const request = require('supertest');

let app;
if (!process.env.APPLICATION_ENDPOINT) {
  app = require('../../index');
}

request(process.env.APPLICATION_ENDPOINT || app.app)
  .get('/')
  .expect('Content-Type', /html/)
  .expect('Content-Length', '12')
  .expect(200)
  .end(function(err, res){
    if (!process.env.APPLICATION_ENDPOINT) {
      app.server.close();
    }
    if (err) {
      throw err;
    }
    console.log('Tests passed');
  });