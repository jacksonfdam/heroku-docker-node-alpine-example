'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// process.env.PORT ensures that Express sets the port Heroku is expecting traffic on
const server = app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});

module.exports.app = app;

module.exports.server = server;