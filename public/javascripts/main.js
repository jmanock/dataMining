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
            ~ voter page url
            ~ google maps url
          */
          for(var i = 0; i<data.length; i++){
            $('#results').append(
              '<li>'+data[i].Name
              +' '+data[i].Age
              +' '+data[i].Dob
              +' '+data[i].Address
              +' '+data[i].Address2
              +' '+data[i].City
              +' '+data[i].Zip
              +'<a href='+data[i].Url+' target="_blank">'+'Voter Page</a>'
              +'<a href='
              +'</li>'
            );
          }
        }
      });
    }
  })

});//End `Document.Ready`
