window.onload = function() {
displayData();
}

var map;
var markers = [];
var infoWindow;
var locationSelect;

function initMap() {
var location = {lat: 23.6850, lng: 90.3563};
map = new google.maps.Map(document.getElementById('map'), {
  center: location,
  zoom: 11,
  disableDefaultUI: true,
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
// var scale = Math.round(i.cases / totalCases * 100) + 5
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
