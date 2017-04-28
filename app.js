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
    var results = line.split(/[\t]+/);
    for(var i = 0; i<results.length; i++){
      if(results[i].includes('/')){
        dob = results[i-1];
        gender = results[i-3];
        race = results[i-2];
      }
    }
    var county = results[0];
    var voterId = results[1];
    var lName = results[2];
    // This part changes on length of results
    var fName = results[3];
    var middleName = results[4];
    var address = results[6];
    var address2 = results[7];
    var city = results[8];
    var zip = results[10];

    // var race = results[12];
    var registrationDate = results[14];
    var party = results[15];
    var precinct = results[16];
    var areaCode = results[25];
    var phoneNumber = results[26];
    var email = results[27];
    var suffix = ' ';

    if(results[3].length<=3){
      // Checks for suffixName
      suffix = results[3];
      fName = results[4];
      middleName = results[5]
      address = results[7];
      address2 = results[8];
      city = results[9];
      zip = results[11]
      if(zip.length < 5){
        // This looks for middle name
        zip = results[10];
        address = results[6];
        address2 = results[7];
        middleName = ' ';
      }
    }
    if(results[4] === 'N' && results[5] !== 'N'){
      // This is for no middle name
      address = results[5];
      address2 = results[6];
    }
    /*
      ~ Url link to the page with more info
    */
    var letters = /^[A-Z]+$/;
    if(zip.match(letters)){
      zip = results[9];
    }

    if(zip.includes(' ')){
      zip = results[9];
    }

    if(gender.length > 1){
      // console.log(gender);
      // console.log(results);
    }
    console.log(fName, lName, gender, race);
  }// End `Search Function`
});// End `/search`
module.exports = app;
