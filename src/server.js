const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
const morgan = require('morgan');
const metodOveride = require('method-override');

//initializaciones
const app = express();

//setings
app.set('port', process.env.PORT || 4000);

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(metodOveride('_method'))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST,PATCH, DELETE, GET')
        return res.status(200).json({});
    }
    next();
});

//routes
app.use(require('./routes/notes.routes'));
app.use(require('./routes/libro.routes'));
app.use(require('./routes/revista.routes'));
app.use(require('./routes/miembroB.routes'));
app.use(require('./routes/personalB.routes'));


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

module.exports = app;

