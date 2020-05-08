window.onload = function() {
displayData();
displayDistData();
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
var total_cases = nation['cases'][0];
var daily_cases = nation['cases'][1];
var total_death = nation['death'][0];
var daily_death = nation['death'][1];
var total_recovered = nation['recovered'][0];
var daily_recovered = nation['recovered'][1];

document.getElementById('update').innerHTML = update_time;
document.getElementById('cases').innerHTML = total_cases;
document.getElementById('cases_daily').innerHTML = daily_cases;
document.getElementById('death').innerHTML = total_death;
document.getElementById('death_daily').innerHTML = daily_death;
document.getElementById('recovered').innerHTML = total_recovered;
document.getElementById('recovered_daily').innerHTML = daily_recovered;

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
var total_deaths = district['cases']['total_deaths'];
var total_recoveries = district['cases']['total_recoveries'];
bounds.extend(latlng);
createMarker(latlng, name,total_cases, total_deaths, total_recoveries, index);
}
map.fitBounds(bounds);
}

function displayDistData(){
  var districtsHtml = ''
  for(var [index,district] of districts.entries()){
    var district_name = district['name'];
    var district_case = district['cases']['total_cases'];
    var district_death = district['cases']['total_deaths'];

    districtsHtml += `
      

    <div class="dist-list-cont">
    <div class="dist-list-viewer">
        
        <div class="dist-list">
        ${district_name} 
        </div>

        <div class="death-list">
        ${district_case}
        </div>

        <div class="recover-list">
        ${'No Data'}
        </div>

    </div>
    </div>
    `
    document.querySelector('.dist-list-cont').innerHTML = districtsHtml;
  }
}

function createMarker(latlng, name, total_cases, total_deaths, total_recoveries){
var html = "<b>" + name + '</b> </br>Total Case : ' + total_cases;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    animation: google.maps.Animation.DROP,
    label: {
      text: total_cases.toString(),
      color: 'black',
    }
    
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker, total_cases);  
  });
  markers.push(marker);

}
