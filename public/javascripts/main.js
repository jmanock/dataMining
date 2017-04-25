$(document).ready(function(){
  $('#search').on('keyup', function(e){
    if(e.keyCode === 13){
      var search = $(this).val();
      var split = search.split(' ');
      var firstName = split[0];
      var lastName = split[1];

      var params = {
        firstName:firstName,
        lastName:lastName
      };
      $.get('/searching', params, function(data){
        
      });
    }
  })
});
