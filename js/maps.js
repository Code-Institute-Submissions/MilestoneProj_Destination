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

   // input = document.getElementById('autocomplete');
   // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
    //autocomplete.bindTo('bounds', map);

    var marker = new google.maps.Marker({
        position: options,
        map: map,
        title: "place"
    })
}
function renderMap(){
    var city = document.getElementById('autocomplete').value;

    selectedTypes = [];
    $('.types').each(function () {
        if ($(this).is(':checked')) {
            selectedTypes.push($(this).val());
        }
    });


    map = new google.maps.Map(document.getElementById('map'), {
        center: city,
        zoom: 13
    });

            //console.log(selectedTypes);

    var request = {
        location: city.geometry.location,
        radius: 8000,
        types: selectedTypes
    };

    infowindow = new google.maps.InfoWindow();

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

}

    function callback(results, status) {

        if (status == google.maps.places.PlacesServiceStatus.OK) {

            for (var i = 0; i < results.length; i++) {

                //   label: labels[i % labels.length]
                createrMarker(results[i]);
            }
        }
    }

    function createrMarker(city,icon) {
        var placeLoc = city.geometry.location;

        var marker = new google.maps.Marker({
            map: map,
            position: city.geometry.location,
            icon: {
                url: icon,
                scaledSize: new google.maps.Size(20, 20) // pixels
            },
            animation: google.maps.Animation.DROP
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(city.name+ '<br>' +city.vicinity);
            infowindow.open(map, this);
        });
    }
