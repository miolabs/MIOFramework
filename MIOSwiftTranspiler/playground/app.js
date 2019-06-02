const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './client')));

app.use('/api/transpile', require('./routes/transpile'));

app.use(require('./routes/index'));

module.exports = app;