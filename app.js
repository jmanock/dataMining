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
    SHOW:
      ~ Address
      ~ Zip
      ~ County
      ~ Age
      ~ Name
      ~ Url link to the page with more info
    */
    var results = line.split(/[\t]+/);
    var county = results[0];
    var voterId = results[1];
    var lName = results[2];
    // This part changes on length of results
    // if results[3].length <= 3
    var fName = results[3];
    var middleName = results[4];
    var address = results[6];
    var address2 = results[7];
    var city = results[8];
    var zip = results[10];
    var gender = results[11];
    var race = results[12];
    var dob = results[13];
    var registrationDate = results[14];
    var party = results[15];
    var precinct = results[16];
    var areaCode = results[25];
    var phoneNumber = results[26];
    var email = results[27];
    var suffix;

    if(results[3].length<=3){
      // Check for suffixName
      // Check length;
      suffix = results[3];
      fName = results[4];
      address = results[7];
      address2 = results[8];
      city = results[9];
      gender = results[12];
      zip = results[11]
      dob = results[14];
      if(zip.length < 5){
        zip = results[10];
      }
    }
    // Need to check for 2nd address
    if(results[11].includes(' ')){
      // This might be 2nd address or pobox
      // Looks like dob should change
      //dob = results[14] || results[13];
      // Address = results[7-8] || results[6-7]
      // dob = 18,17
      if(results[17].length > 1){
        dob = results[17];
      }else if(results[18].length > 1){
        dob = results[18];
      }else{
        dob = results[19];
        console.log(results.length);
      }

    }
    //console.log(results.length, fName+' '+lName, dob,zip);

    // if(results.length === 26 || results.length === 28){
    //   // Seperate into two groups
    //   if(results.includes('JR')||results.includes('II')||results.includes('III')|| results.includes('IV')){
    //     // Name Suffix shift everything plus one?
    //     fName = results[4];
    //     suffix = results[3];
    //   }
    // }




  }// End `Search Function`
});// End `/search`
module.exports = app;
