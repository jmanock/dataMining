$(document).ready(function(){
  $('#loader').hide();
  $('#search').on('keyup', function(e){
    if(e.keyCode === 13){
      /*
        ~ Change layout
        ~ Work on errors with hyphins or middle name
        ~ Clear on enter
      */
      $('#loader').show();
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
          $('#loader').hide();
          $('#results').append(
            '<thead>'+'<tr>'
            +'<th class="name">Name</th>'
            +'<th class="age">Age</th>'
            +'<th class="address">Address</th>'
            +'<th class="apt">Apt/Unit</th>'
            +'<th class="city">City</th>'
            +'<th class="zip">Zip</th>'
            +'<th class="google">Google Maps</th>'
            +'<th class="voter">Voter Page</th>'
            +'</tr></thead>'
          );
          for(var i = 0; i<data.length; i++){
            var name = data[i].Name;
            var address = data[i].Address;
            var address2 = data[i].Address2;
            var dob = data[i].Dob;
            var age = data[i].Age;
            var city = data[i].City;
            var zip = data[i].Zip;
            var google = '<a href='+data[i].UrlAddress+' target="_blank">'+'Google Maps</a>';
            var voter = '<a href='+data[i].Url+' target="_blank">'+'Voter Page</a>';
            $('thead').append(
              '<tr>'
                +'<td>'+name+'</td>'
                +'<td>'+age+'</td>'
                +'<td>'+address+'</td>'
                +'<td>'+address2+'</td>'
                +'<td>'+city+'</td>'
                +'<td>'+zip+'</td>'
                +'<td>'+google+'</td>'
                +'<td>'+voter+'</td>'+
              '</tr>'
            );
          }
        }
      });// End `Get`
    }
  });// End `keyUp`

});//End `Document.Ready`
