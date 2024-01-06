console.log('app.js called');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
const usresRoutes =  require('./routes/users.route');
app.use(bodyParser.json());
app.use('/', usresRoutes)
module.exports = app;
