// SETUP =======================================================================
var express  = require('express');
var bodyParser = require('body-parser');
var morgan  = require('morgan');
var mongoose = require('mongoose');

var cors = require('./app/cors');

var app      = express();
var port     = process.env.PORT || 8080;
var database = require('./db/database');

// CONFIGURATION ===============================================================
mongoose.connect(database.url);

//app.use(express.static(__dirname + '/public'));

app.use(cors);
app.use(bodyParser.json());
app.use(morgan('dev', {format: 'dev', immediate: true}));

// ROUTES ======================================================================
require('./app/routes.js')(app);

module.exports = app.listen(app.get('port'), function() { });

// LISTEN ======================================================================
app.listen(port);
console.log("App listening on port " + port);
