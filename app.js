var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv')
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
const passport = require('passport')
const cookieSession = require('cookie-session')
require('./src/utils/passportConfig')
var app = express();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(cookieSession({
  name: 'main session',
  keys: ['key1', 'key2']
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


if (process.env.NODE_ENV ==='production'){
  app.use(express.static(path.join(__dirname,'client/build')))
}




app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use(function(req, res, next) {
 
  next(createError(404));
});


app.use(function(err, req, res, next) {
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get("*",(req, res)=>{
  res.sendFile(path.join(__dirname,"/client/build/index.html"))
})



module.exports = app;
