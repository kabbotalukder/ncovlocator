var map;window.onload=function(){displayData(),displayDistData()};var infoWindow,locationSelect,markers=[],main_bound={north:27.382407993732738,east:95.31653598567469,south:19.463173036003,west:85.07727182551838};function initMap(){map=new google.maps.Map(document.getElementById("map"),{center:{lat:23.221057,lng:90.425433},zoom:11,disableDefaultUI:!0,restriction:{latLngBounds:main_bound,strictBounds:!1}}),infoWindow=new google.maps.InfoWindow,showStoresMarkers()}function displayData(){var e=nation.update,n=nation.cases[0],t=nation.cases[1],a=nation.death[0],o=nation.death[1],i=nation.recovered[0],s=nation.recovered[1];document.getElementById("update").innerHTML=e,document.getElementById("cases").innerHTML=n,document.getElementById("cases_daily").innerHTML=t,document.getElementById("death").innerHTML=a,document.getElementById("death_daily").innerHTML=o,document.getElementById("recovered").innerHTML=i,document.getElementById("recovered_daily").innerHTML=s}function showStoresMarkers(){var e=new google.maps.LatLngBounds;for(var[n,t]of districts.entries()){var a=new google.maps.LatLng(t.coordinates.latitude,t.coordinates.longitude),o=t.name,i=t.cases.total_cases,s=t.cases.total_deaths,d=t.cases.total_recoveries;e.extend(a),createMarker(a,o,i,s,d,n)}map.fitBounds(e)}function displayDistData(){var e="";for(var[n,t]of districts.entries()){var a=t.name,o=t.cases.total_cases;t.cases.total_deaths;e+=`\n      \n\n    <div class="dist-list-cont">\n    <div class="dist-list-viewer">\n        \n        <div class="dist-list">\n        ${a} \n        </div>\n\n        <div class="death-list">\n        ${o}\n        </div>\n\n        <div class="recover-list">\n        No Data\n        </div>\n\n    </div>\n    </div>\n    `,document.querySelector(".dist-list-cont").innerHTML=e}}function createMarker(e,n,t,a,o){var i="<b>"+n+"</b> </br>Total Case : "+t,s=new google.maps.Marker({map:map,position:e,animation:google.maps.Animation.DROP,label:{text:t.toString(),color:"black"}});google.maps.event.addListener(s,"click",function(){infoWindow.setContent(i),infoWindow.open(map,s,t)}),markers.push(s)}
