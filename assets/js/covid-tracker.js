window.onload = function() {
displayData();
}

var map;
var markers = [];
var infoWindow;
var locationSelect;
var main_bound = {
north: 27.382407993732738,
east: 95.31653598567469,
south: 19.463173036003,
west: 85.07727182551838,
};

function initMap() {
var location = {lat: 23.221057, lng: 90.425433}
map = new google.maps.Map(document.getElementById('map'), {
center: location,
zoom: 11,
disableDefaultUI: true,
restriction: {
latLngBounds: main_bound,
strictBounds: false,
},
});
infoWindow = new google.maps.InfoWindow();
showStoresMarkers();
}

function displayData(){
var update_time = nation['update'];
var total_cases = nation['active'];
var total_death = nation['death'];
var total_recovered = nation['recovered'];

document.getElementById('update').innerHTML = update_time;
document.getElementById('cases').innerHTML = total_cases;
document.getElementById('death').innerHTML = total_death;
document.getElementById('recovered').innerHTML = total_recovered;

}

function showStoresMarkers(){
var bounds = new google.maps.LatLngBounds();
for(var [index , district] of districts.entries()){

var latlng = new google.maps.LatLng(
district['coordinates']['latitude'],
district['coordinates']['longitude']
);

var name = district['name'];
var total_cases = district['cases']['total_cases'];
bounds.extend(latlng);
createMarker(latlng, name,total_cases, index);
}
map.fitBounds(bounds);
}

function createMarker(latlng, name, total_cases){

var html = "<b>" + name + '</b> </br>Number of Cases : ' + total_cases  ;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    animation: google.maps.Animation.DROP,
    label : total_cases.toString()
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker, total_cases);  
  });
  markers.push(marker);

}
