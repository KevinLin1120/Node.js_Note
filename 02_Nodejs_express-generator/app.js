var createError = require('http-errors');
var express = require('express'); // Generate app
var path = require('path'); // Handle file path
var cookieParser = require('cookie-parser'); // Parse cookie from web
var logger = require('morgan');

var indexRouter = require('./routes/index');
var moduleRouter = require('./routes/module');
var routeRouter = require('./routes/route');
var ajaxRouter = require('./routes/ajax');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Can access static files from public folder

app.use('/', indexRouter);
app.use('/module', moduleRouter);
app.use('/route', routeRouter);
app.use('/ajax', ajaxRouter);
app.use('/users', usersRouter);

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
