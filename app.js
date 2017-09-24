'use strict';

let DEBUG_TRACE_LEVEL = require('./config/local_config').DEBUG_TRACE_LEVEL;

let express = require('express');
let bodyParser = require('body-parser');

let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');

if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('1.app');
}


let routes = require('./index');

if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('2.app');
}


let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
//We convert json objects to the data we receive from http requests
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('3.app');
}


// charge connection with mongoDB
require('./lib/mongoConnection');

if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('4.app');
}


// Load models
require('./models/Address');
require('./models/Category');
require('./models/CreditCard');
require('./models/Demand');
require('./models/Offer');
require('./models/OfferConcept');
// require('./models/Professional');
require('./models/Subcategory');
require('./models/User');


////// We load the Routes ////////
let professional_routes = require('./routes/api/v1/professional');
// let categories_routes = require('./routes/api/v1/categories');
// let subcategories_routes = require('./routes/api/v1/subcategories');
// let user_routes = require('./routes/api/v1/user');
// let address_routes = require('./routes/api/v1/address');
// let creditcards_routes = require('./routes/api/v1/creditcards');
// let demands_routes = require('./routes/api/v1/demands');
// let offers_routes = require('./routes/api/v1/offers');
// let offerconcepts_routes = require('./routes/api/v1/offerconcepts');


/// Mocks ///
let mocks_routes = require('./mocks/mockroutes');

//let interactor_routes = require('./interactors/Professionals');
let index_routes = require('./index');

if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('5.app');
}


//////// Here we configure the headers //////////

//////// Here are the Routes base //////////
app.use('/api/v1', professional_routes);
// app.use('/api/v1', categories_routes);
// app.use('/api/v1', subcategories_routes);
// app.use('/api/v1/user', user_routes);
// app.use('/api/v1/user', address_routes);
// app.use('/api/v1/user', creditcards_routes);
// app.use('/api/v1/user', demands_routes);
// app.use('/api/v1/user', offers_routes);
// app.use('/api/v1/user', offerconcepts_routes);


if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('6.app');
}


// charge models
//require('./models/Professional');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('7.app');
}


/*
app.use('/', index_routes);
app.use('/users', users);

// rutes (mock & real)
app.use('/api/v1', require('./controllers/professionals/professionals'));
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('8.app');
}


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('9.app');
}


//We export the Module
module.exports = app;

if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('10.app');
}