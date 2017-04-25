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

      });
    }
  })
});
