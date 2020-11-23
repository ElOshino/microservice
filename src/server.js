const express = require('express');
var bodyParser = require('body-parser')
const morgan = require('morgan');
const metodOveride = require('method-override');

//initializaciones
const app = express();

//setings
app.set('port', process.env.PORT || 4000);

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(metodOveride('_method'))

//routes
app.use(require('./routes/notes.routes'));


module.exports = app; 

