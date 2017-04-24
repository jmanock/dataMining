// var fs = require('fs');
// var readline = require('readline');
// var stream = require('stream');
// var instream = fs.createReadStream('../Desktop/orange2:17.txt');
// var outstream = new stream;
// var rl = readline.createInterface(instream, outstream);
//
// rl.on('line', function(line){
//   /*
//     ~ Should be able to edit data
//     ~ Only get back info that is needed
//   */
//   if(line.includes('CHASE')){
//     something(line);
//   }
// });
// rl.on('close', function(){
//   console.log('GameOver!!!');
// });
// function something(x){
//   // This has an email address in the line
//   /*
//     ~ Maybe throw these in a spread sheet?
//   */
//   console.log(x);
// }

var fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require('event-stream');

var lineNr = 0;

var s = fs.createReadStream('../Desktop/orange2:17.txt')
    .pipe(es.split())
    .pipe(es.mapSync(function(line){

        // pause the readstream
        s.pause();

        lineNr += 1;

        // process line here and call s.resume() when rdy
        // function below was for logging memory usage
        logMemoryUsage(lineNr);

        // resume the readstream, possibly from a callback
        s.resume();
    })
    .on('error', function(){
        console.log('Error while reading file.');
    })
    .on('end', function(){
        console.log('Read entire file.')
    })
);
