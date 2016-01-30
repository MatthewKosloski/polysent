// Dependencies/variables
// -----------------------------------------------------
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./app/config');

var port = config.port;
var app = express();

// Express Configuration
// -----------------------------------------------------
// Sets the connection to MongoDB
mongoose.connect(config.db);

// Initialize MAI (only once)
// ------------------------------------------------------
var autoIncrement = require('mongoose-auto-increment'),
    connection = mongoose.createConnection(config.db);
autoIncrement.initialize(connection);

// Check the boolean value of seed variable
// ------------------------------------------------------
// If seed is true, populate database
if(config.seed) require('./app/seed');

// View engine setup
// ------------------------------------------------------
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');

// Logging and Parsing
// ------------------------------------------------------
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.disable('x-powered-by');
// app.enable('trust proxy');

// CORS Support
// ------------------------------------------------------
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes
// ------------------------------------------------------
require('./app/routes')(app);

// If page is refreshed, it'll show the page and not 404
// ------------------------------------------------------
app.use(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Error handler
// ------------------------------------------------------
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port + '...');