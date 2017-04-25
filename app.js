var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var files = ['../Desktop/orange2:17.txt', '../Desktop/seminal2:17.txt'];
var instream = fs.createReadStream(files);
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

rl.on('line', function(line){
  /*
    ~ Should be able to edit data
    ~ Only get back info that is needed
  */
  if(line.includes('JEB')){
    something(line);
  }
});
rl.on('close', function(){
  console.log('GameOver!!!');
});
function something(x){
  // This has an email address in the line
  /*
    ~ Maybe throw these in a spread sheet?
  */
  console.log(x);
}
