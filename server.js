// server.js

//set up===============================================
//get all our tools

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require("mongoose");
var passport = require('passport');
var flash = require('connect-flash');

var configDB = require('./config/database.js');

//configuration=========================================
mongoose.connect(configDB.url); //connect to our db

//pass passport for configuration
//require('./config/passport')(passport);

app.configure(function(){

  //set up our express app==========

  //log every request to the console
  app.use(express.logger('dev'));

  //read cookies (needed for auth)
  app.use(express.cookieParser());

  //get information from html forms
  app.use(express.bodyParser());

  //set ejs fer templatin'
  app.set('view engine', 'ejs');

  //set up stuff for passport

  //session secret
  app.use(express.session({
    secret: 'fuckYourCouch'
  }));

  app.use(passport.initialize());

  //persistent login sessions
  app.use(passport.session());

  //use connect-flash for flash messages stored in session
  app.use(flash());
});

//routes================================================