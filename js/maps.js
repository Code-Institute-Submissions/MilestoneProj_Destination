 var infowindow;
 var service;
 //var map;
 var marker;
 var input;
 var place;
 
 function initMap(){
     var options= {lat:53.3498,lng:-6.2603};
    
          var map = new google.maps.Map(document.getElementById("map"),{
             zoom: 8,
             center: options,
    //    var maker = new google.maps.Marker({
      //       position:  {lat:53.3498,lng:-6.2603},
     //        map:map,
             
          }); 
            
            
           var input = document.getElementById('autocomplete');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
   
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    
    
    var labels = "ABCDEFGHIJKLMNOPQRSTUVWYZ";
    
    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
     // label: labels[i % labels.length],
        position: options,
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });
           
        //    google.maps.event.addListener(autocomplete, 'place_changed', function(){
           
           // var place = autocomplete.getPlace();
   //   })
      

    
      
       autocomplete.addListener('place_changed', function(){
       marker.setVisible(false);
       place = autocomplete.getPlace();
       map:map;
       
      if (place) {
           // map.fitBounds(placeselected.geometry.viewport);
            map.setCenter(place.geometry.location);
            map.setZoom(8);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(8);
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
})
    
    
    
    function searchSelected(){
        var request ={
        
        location: place,
        radius : 500,
        types:['lodging']
        
    };
        var service = new google.maps.places.PlacesService(map);
    	service.nearbySearch(request, callback);
        
    }
     function callback(results, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        return;
      } else {
        createMarkers(results);
      }
    }

    function createMarkers(places) {
      var bounds = new google.maps.LatLngBounds();

      for (var i = 0, place; place = places[i]; i++) {
        var image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
          map: map,
          icon: image,
          title: place.name,
          position: place.geometry.location
        });

        bounds.extend(place.geometry.location);
      }
      map.fitBounds(bounds);
    }

    window.google.maps.event.addDomListener(window, 'load', initMap);



}      
         