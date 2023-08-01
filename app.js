var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session')

var app = express();

const mongoose = require('mongoose')

const dbConfig = require('./config/db.config');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'rubicamp',
  resave: false,
  saveUninitialized: true
}));

require('./app/routes/users.route')(app)
require('./app/routes/oauth.route')(app)

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbConfig.url)
    console.log('Database Connected!')
  } catch (e) {
    console.error('Cannot connect to the database!', e);
    process.exit(1);
  }
}

connectToDatabase()

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
