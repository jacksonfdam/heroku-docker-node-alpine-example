'use strict';

const request = require('supertest');

let app;
if (!process.env.APPLICATION_ENDPOINT) {
  app = require('../../index');
}

function checkResult(err, res){
  if (!process.env.APPLICATION_ENDPOINT) {
    app.server.close();
  }
  if (err) {
    throw err;
  }
  console.log('Tests passed');
}

request(process.env.APPLICATION_ENDPOINT || app.app)
  .get('/')
  .expect('Content-Type', /html/)
  .expect('Content-Length', '12')
  .expect(200)
  .end(checkResult);

request(process.env.APPLICATION_ENDPOINT || app.app)
  .get('/increment')
  .expect('Content-Type', /html/)
  .expect('Content-Length', '1')
  .expect(200, '1')
  .end(checkResult);

request(process.env.APPLICATION_ENDPOINT || app.app)
  .get('/increment')
  .expect('Content-Type', /html/)
  .expect('Content-Length', '1')
  .expect(200, '2')
  .end(checkResult);