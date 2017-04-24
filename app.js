var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var instream = fs.createReadStream('../Desktop/orange2:17.txt');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

rl.on('line', function(line){
  if(line.includes('@')){
    something(line);
  }
});
rl.on('close', function(){
  console.log('ThisFuckingShitEnded');
});
function something(x){
  console.log(x);
}
