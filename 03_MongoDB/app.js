var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Through mongoose connect to mongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mongoTest"); // DB ip
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function() {
  console.log("DB connection success!");
});

// Specify collection fields
var testSchema = new mongoose.Schema( {
  id: Number,
  name: String
});

// Set collection to 'test'
testSchema.set('collection', 'test');
// Model to communicate with DB 
// ('test': collection name, testSchema: data structure)
var testModel = mongoose.model('test', testSchema);

// // Create data
// var content = new testModel({id: 2, name: "Kevin"});
// // Add data to db
// content.save()
//   .then(function(err) {
//     if(err) console.log(err); // Save error
//     else console.log("Save success!"); // Save success
//   });

// Read all data 
// testModel.find()
//   .then(function(data, err) {
//     if(err) console.log(err);
//     else console.log(data);
//   });

// Read with condition
// testModel.find({$or: [{id: 1}, {id: 2}]})
//   .then(function(data, err) {
//     if(err) console.log(err);
//     else console.log(data);
//   });

// Update one data 
// testModel.updateOne({id: 2}, {name: "Cook"})
//   .then(function(err) {
//     if(err) console.log(err);
//     else console.log("success");
//   });
// // Update many data
// testModel.updateMany({id: 2}, {name: "Cook"})
//   .then(function(err) {
//     if(err) console.log(err);
//     else console.log("success");
//   });

// // Delete one data 
// testModel.deleteOne({id: 1})
//   .then(function(err) {
//     if(err) console.log(err);
//     else console.log("Delete success");
//   });
  
// // Delete many data
// testModel.deleteMany({id: 2})
//   .then(function(err) {
//     if(err) console.log(err);
//     else console.log("Delete success");
//   });
  
  
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
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
