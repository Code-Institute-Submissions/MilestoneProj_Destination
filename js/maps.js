 var infowindow;
var service;

 var marker;
 var input;
 var place;
 var options;
var map;

var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
 var labelIndex = 0;

 
 
 function initMap(){
     var options= {lat:53.3498,lng:-6.2603};
    
           map = new google.maps.Map(document.getElementById("map"),{
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
    
    
   // var labels = "ABCDEFGHIJKLMNOPQRSTUVWYZ";
    
  //  var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
     // label: labels[i % labels.length],
        position: options,
        map: map,
        title:"place"
       // anchorPoint: new google.maps.Point(0, -29)
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
            map.setZoom(13);
            marker.setPosition(place.geometry.location);
        marker.setVisible(true);
            var request = {
     location: place.geometry.location,
     radius: 8000,
     types:['cafe']
 };
       var service = new google.maps.places.PlacesService(map);
 
       service.nearbySearch(request,callback);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(13);
        }
   

}) ;
 


 }
//var labels = "ABCDEFGHIJKLMNOPQRSTUVWYZ";
 
 function callback(results, status){

     if(status == google.maps.places.PlacesServiceStatus.OK){
      
         for(var i= 0; i<results.length; i++){
          
         //   label: labels[i % labels.length]
             createrMarker(results[i]);
         }
     }
 }
// var labels = String.fromCharCode("A".charCodeAt(0) + index)
 function createrMarker(place){
     var placePos = place.geometry.location;
     var marker = new google.maps.Marker({
         label: labels[labelIndex++ % labels.length],
         map: map,
         position: place.geometry.location,
         title:place.name
     })
 }
 //google.maps.event.addDomListener(window, 'load', initMap);