$(document).ready(function(){
  $('#search').on('keyup', function(e){
    if(e.keyCode === 13){
      var search = $(this).val();
      var split = search.split(' ');
      var firstName = split[0].toUpperCase();
      var lastName = split[1].toUpperCase();

      var params = {
        firstName:firstName,
        lastName:lastName
      };
      $.get('/search', params, function(data){
        if(data instanceof Array){
          /*
            ~ Maybe url links
            ~ Google maps?
            ~ Better font and color
            ~ Search for a space only one
            name address address2 zip dob age city
          */
          for(var i = 0; i<data.length; i++){
            $('#results').append('<li>'+data[i].Name+data[i].Age+data[i].Address+data[i].Address2+data[i].Zip+data[i].City);
          }
        }
      });
    }
  })

});//End `Document.Ready`
// function initMap(){
//   var uluru = {
//     lat:27.6648,
//     lng:-81.5158
//   };
//   var map = new google.maps.Map(document.getElementById('map'),{
//     zoom:7,
//     center:uluru
//   });
//   var marker = new google.maps.Marker({
//     position:uluru,
//     map:map
//   });
//
// }
