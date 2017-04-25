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
  /*
    ~ Add more files to search
    ~ Maybe a for function add to i if not found
    ~ Should
  */
  var files = ['public/files/orange2:17.txt', 'public/files/seminal2:17.txt'];
  var instream = fs.createReadStream('public/files/org_sem.txt');
  var outstream = new stream;
  var rl = readline.createInterface(instream, outstream);
  var firstName = req.query.firstName;
  var lastName = req.query.lastName;
  rl.on('line', function(line){
    if(line.includes(firstName) && line.includes(lastName)){
      console.log(line);
    }
  });
  rl.on('close', function(){
    console.log('Im Done');
  });
});// End `/search`
module.exports = app;
