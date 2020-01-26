$(document).ready(function(){

    var types = ['bar','cafe','lodging','museum','night_club','park','restaurant'];
    var html = '';

    $.each(types, function( index, value ) {
        var name = value.replace(/_/g, " ");
        html += '<div><label><input type="checkbox" class="types" value="'+ value +'" />'+ capitalizeFirstLetter(name) +'</label></div>';
    });

    $('#types_holder').html(html);
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var infowindow;
var service;
var marker;
var input;
var place;
var options;
var map;
var selectedTypes = [];

var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;


function initMap() {
    var options = {lat: 53.3498, lng: -6.2603};

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: options,


    });

    input = document.getElementById('autocomplete');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);


    var marker = new google.maps.Marker({
        position: options,
        map: map,
        title: "place"

    });



    autocomplete.addListener('place_changed', function () {
        marker.setVisible(false);
        place = autocomplete.getPlace();
        map:map;

        if (place) {
            map.setCenter(place.geometry.location);
            map.setZoom(13);
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);



            var request = {
                location: place.geometry.location,
                radius: 8000,
                types: ['tourist_attraction','museum']
            };
            //   })
            var service = new google.maps.places.PlacesService(map);

            service.nearbySearch(request, callback);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(13);
        }


    });


function callback(results, status) {

        if (status == google.maps.places.PlacesServiceStatus.OK) {

            for (var i = 0; i < results.length; i++) {

                //   label: labels[i % labels.length]
                createrMarker(results[i]);
            }
        }
    }

    function createrMarker(place) {
        var placePos = place.geometry.location;
        var marker = new google.maps.Marker({
            label: labels[labelIndex++ % labels.length],
            map: map,
            position: place.geometry.location,
            title: place.name
        })
    }

}
