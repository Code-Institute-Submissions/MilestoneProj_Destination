 var infowindow;
 var service;
 //var map;
 var marker;
 var input;
 
 function initMap(){
     var options= {lat:53.3498,lng:-6.2603};
    
          var map = new google.maps.Map(document.getElementById("map"),{
             zoom: 13,
             center: options,
    //    var maker = new google.maps.Marker({
      //       position:  {lat:53.3498,lng:-6.2603},
     //        map:map,
             
          }); 
            
           
             
           var input = document.getElementById('autocomplete');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
   
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
  
    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        position: options,
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });
           
        //    google.maps.event.addListener(autocomplete, 'place_changed', function(){
           
           // var place = autocomplete.getPlace();
   //   })
      

    
      
       autocomplete.addListener('place_changed', function(){
       marker.setVisible(false);
       var place = autocomplete.getPlace();
       map:map;
       
      if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
            map.setCenter(place.geometry.location);
            map.setZoom(13);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(13);
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        
    
        
       
       
      })
}      
         