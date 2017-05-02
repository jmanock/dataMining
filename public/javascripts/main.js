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
          */
          console.log(data);
        }
      });
    }
  })

});//End `Document.Ready`
function initMap(){
  var uluru = {
    lat:-25.363,
    lng:131.004
  };
  var map = new google.maps.Map(document.getElementById('map'),{
    zoom:4,
    center:uluru
  });
  var marker = new google.maps.Marker({
    position:uluru,
    map:map
  });
  var 
}
