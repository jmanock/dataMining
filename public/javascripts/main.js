$(document).ready(function(){
  $('#search').on('keyup', function(e){
    if(e.keyCode === 13){
      /*
        ~ Change layout
        ~ Maybe use a table
        ~ Work on errors with hyphins or middle name
        ~ Style better
      */
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
              +'<a href='+data[i].UrlAddress+' target="_blank">'+'Google Maps</a>'
              +'</li>'
            );
          }
        }
      });
    }
  })

});//End `Document.Ready`
