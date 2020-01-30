
/* Populating types to be searched */
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
var markers = [];
var options;
var map;
var labelIndex = 0;
var typeSelected = [];
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var legend = document.getElementById("result");
legend.innerHTML = "";

/* Initializing default map */
function initMap() {

    var options = {lat: 53.3498, lng: -6.2603};

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: options,
    });

    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));

}

/* Render Map after user choose type of entertainment */
/* Results and Markers are cleaned every time user search for a new entertiment */
function renderMap(){
    clearResults();
    clearMarkers();
    //clearMarkers();
    var city = document.getElementById('autocomplete').value;

    typeSelected = [];
    $('.types').each(function () {
        if ($(this).is(':checked')) {
            typeSelected.push($(this).val());
        }
    });

    var geo   = new google.maps.Geocoder();
    var LocLat   = 0;
    var LocLng   = 0;

    geo.geocode({'address': city}, function(results, status) {
        if (status === 'OK')
        {

            LocLat   = results[0].geometry.location.lat();
            LocLng   = results[0].geometry.location.lng();


            var cities = new google.maps.LatLng(LocLat, LocLng);

            map = new google.maps.Map(document.getElementById('map'), {
                center: cities,
                zoom: 13
            });


            var request = {
                location: cities,
                radius: 4000,
                types: typeSelected
            };

            infowindow = new google.maps.InfoWindow();

            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
        }
        else
        {
            alert('Please enter a city');
        }
    });
}

/* Callback function getting results */
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {


        for (var i = 0; i < results.length; i++) {
            createrMarker(results[i]);
        }
    }
    labelIndex = 0;
}

/* Creating Markers for each result on the area searched */
function createrMarker(cities) {
    var marker = new google.maps.Marker({
        map: map,
        position: cities.geometry.location,
        label: labels[labelIndex++ % labels.length],
        animation: google.maps.Animation.DROP
    });

/* Details for each place */
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(cities.name+ '<br>' +cities.vicinity + '<br>'+cities.website);
        infowindow.open(map, this);
    });

    legend.innerHTML += "<div>"+ marker.label + "|" + cities.name + "</div>";
}

/* Cleaning Results */
function clearResults() {
    var results = document.getElementById('result');
    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}

/* Cleaning Markers */
function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}
