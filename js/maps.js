 function initMap(){
     var options={
         zoom: 8,
         center: {lat:53.3498,lng:-6.2603},
     }
            var map = new google.maps.Map(document.getElementById("map"), options);
            
            var maker = new google.maps.Marker({
             position:  {lat:53.3498,lng:-6.2603},
             map:map,
             
            })
             
         //   var input = document.getElementById("autocomplete"); 
            var input = new google.maps.places.Autocomplete(document.getElementById("autocomplete"),{types: ['(cities)']});
            google.maps.event.addListener(autocomplete, 'place_changed', function(){
            var place = autocomplete.getPlace();
      })
             
           
 }      
         