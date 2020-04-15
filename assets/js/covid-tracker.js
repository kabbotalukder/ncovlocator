window.onload = function() {
  displayData();
}

var map;
var markers = [];
var infoWindow;
var locationSelect;

function initMap() {
    // var location = {lat: 22.358622, lng: 91.806491};
    var location = {lat: 23.6850, lng: 90.3563};
    // var location = {lat: 24, lng: 90};
    map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 11,
    });
    infoWindow = new google.maps.InfoWindow();
    showStoresMarkers();
  }

// // bleh

// function displayData(){
//   var distHtml = ''
//   for(var [cases] of nation.entries()){
//     var total_cases = cases['active'];
//     var total_death = cases['death'];
//     var total_recovered = cases['recovered'];

//     distHtml += `
    
//     <div class="second-one">
//             <div class="block">
//                 <span class="block1">Cases</span>
//                 <span class="block2">${total_cases}</span>
//             </div>
//             <div class="block">
//                 <span class="block1">Death</span>
//                 <span class="block2">${total_death}</span>
//             </div>
//             <div class="block">
//                 <span class="block1">Recovered</span>
//                 <span class="block2">${total_recovered}</span>
//             </div>
//         </div>
    
//     `

//     document.querySelector('.second-one').innerHTML = distHtml;
//   }
// }


function displayData(){
    var total_cases = nation['active'];
    var total_death = nation['death'];
    var total_recovered = nation['recovered'];

    document.getElementById('cases').innerHTML = total_cases;
    document.getElementById('death').innerHTML = total_death;
    document.getElementById('recovered').innerHTML = total_recovered;

    // distHtml = `
    
    //     <div class="second-one">
    //         <div class="block">
    //             <span class="block1">Cases</span>
    //             <span class="block2">${total_cases}</span>
    //         </div>
    //         <div class="block">
    //             <span class="block1">Death</span>
    //             <span class="block2">${total_death}</span>
    //         </div>
    //         <div class="block">
    //             <span class="block1">Recovered</span>
    //             <span class="block2">${total_recovered}</span>
    //         </div>
    //     </div>
    
    // `

    // document.querySelector('.second-one').innerHTML = distHtml;

}




  // marker

  function showStoresMarkers(){
    var bounds = new google.maps.LatLngBounds();
    for(var [index , district] of districts.entries()){
  
      var latlng = new google.maps.LatLng(
        district['coordinates']['latitude'],
        district['coordinates']['longitude']
        );

        // var latlng = new google.maps.LatLng(23.8103 ,
        //    90.4125);
  
      var name = district['name'];
      var total_cases = district['cases']['total_cases'];
      bounds.extend(latlng);
      createMarker(latlng, name,total_cases, index);
      }
      map.fitBounds(bounds);
  }
  
  function createMarker(latlng, name, total_cases){
  
    // var html = "<b>" + name + "</b> <br/>" + address;
    var html = "<b>" + name + '</b> </br>Number of Cases : ' + total_cases  ;
            var marker = new google.maps.Marker({
              map: map,
              position: latlng,
              label : total_cases.toString()
            });
            google.maps.event.addListener(marker, 'click', function() {
              infoWindow.setContent(html);
              infoWindow.open(map, marker, total_cases);
            });
            markers.push(marker);
  
  }
