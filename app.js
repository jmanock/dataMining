var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.get('/search', function(req, res){

  var instream = fs.createReadStream('public/files/allFlorida.txt');
  var outstream = new stream;
  var rl = readline.createInterface(instream, outstream);
  var firstName = req.query.firstName;
  var lastName = req.query.lastName;
  console.log(firstName, lastName);
  rl.on('line', function(line){
    var results = line.toUpperCase();
    if(results.includes(firstName) && results.includes(lastName)){
      Search(results);
    }
  }).on('close', function(){
    console.log('GameOver!');
  });

  function Search(line){
    /*
      ~ Turn dob into age
      ~ Work in google maps to show address
      ~ Return results
    */
    var results = line.split(/[\t]+/);
    var county = results[0];
    var voterId = results[1];
    var lName = results[2];
    var fName = results[3];
    var middleName = results[4];
    var address = results[6];
    var address2 = results[7];
    var city = results[8];
    var zip = results[10];
    var sex = results[11];
    var dob = results[13];
    if(fName === firstName && lastName === lName){
      console.log(county, fName, lName);
    }
    

  }// End `Search Function`
});// End `/search`
module.exports = app;
