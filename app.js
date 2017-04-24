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
//   if(line.includes('JEB')){
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

let google = require('googleapis');
let authentication = require("./authenticate");

function getData(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1VqujYQ439UPkcgjoK2CjSyROvE5M5jMRUbkRatz43eE',
    range: 'Sheet1!A1:U', //Change Sheet1 if your worksheet's name is something else
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var rows = response.values;
    console.log(rows);
  });
}

function appendData(auth){
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.append({
    auth:auth,
    spreadsheetId: '1VqujYQ439UPkcgjoK2CjSyROvE5M5jMRUbkRatz43eE',
    range:'Sheet1!A2:B',
    valueInputOption:'UESR_ENTERED',
    resource:{
      values:[['Void', 'Canvas', 'Website'],['Pual', 'Shaun', 'Human']]
    }
  }, (err, response)=>{
    if(err){
      console.log('FUCK:',err);
    }else{
      console.log('Worked');
    }
  });
}

authentication.authenticate().then((auth)=>{
    appendData(auth);
});

// let google = require('googleapis');
// let authentication = require("./authenticate");
//
//
// function appendData(auth) {
//   var sheets = google.sheets('v4');
//   sheets.spreadsheets.values.update({
//     auth: auth,
//     spreadsheetId: '1VqujYQ439UPkcgjoK2CjSyROvE5M5jMRUbkRatz43eE',
//     range: 'Sheet1!A2:B', //Change Sheet1 if your worksheet's name is something else
//     valueInputOption: "USER_ENTERED",
//     resource: {
//       values: [ ["Void", "Canvas", "Website"], ["Paul", "Shan", "Human"] ]
//     }
//   }, (err, response) => {
//     if (err) {
//       console.log('The API returned an error: ' + err);
//       return;
//     } else {
//         console.log("Appended");
//     }
//   });
// }
//
// authentication.authenticate().then((auth)=>{
//     appendData(auth);
// });
