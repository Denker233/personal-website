window.onload = function() {
    var fadeButton = document.getElementById("fadeButton");
    var image = document.getElementById("enlarged")
    fadeButton.addEventListener("click",function(){
        fade(image);
    });
}

function showup(id, src, txt) {
  var img = document.getElementById(id);

  img.src = src;
  img.alt = txt;
  img.style["display"] = "block"

  var img = document.getElementById("enlarged");
  img.src = src;
  img.alt = txt;
  img.style["display"] = "block"
}

function disappear(id) {      

  var img = document.getElementById(id);
  img.style["display"] = "none"
}



function fade(image) {
    var speed = 15; 
    if(image.style.opacity == 0 && image.style.opacity != "") {
        var num = 0; 
        var timer = setInterval(function() {
            num++;
            image.style.opacity = num / 100;
            if(num >= 100) {
                 clearInterval(timer);
                }
            }, speed);
            document.getElementById("fadeButton").innerHTML="Go Away!";
        }else if(image.style.opacity == 1 || image.style.opacity == "") {
            var num = 100;
            var timer = setInterval(function() {
                num--;
                image.style.opacity = num / 100;
                if(num == 0) {
                    clearInterval(timer);
                }
            }, speed);
            document.getElementById("fadeButton").innerHTML="Come Back!";
        }
    }
    var marker2;
    var pos;
    var infowindow2;
    var markers=[];
    var service;
    var map;
    var geocoder;
    var directionsService;
    var directionsRenderer;
    function initMap() {
        var myLatLng = {lat: 44.9727, lng: -93.23540000000003};
        map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: myLatLng
            });
        directionsRenderer = new google.maps.DirectionsRenderer();
        directionsService = new google.maps.DirectionsService();
        geocoder = new google.maps.Geocoder(); // Create a geocoder object
        service = new google.maps.places.PlacesService(map);

        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
    
            map.setCenter(pos);
            //Put marker of the Geolocated user location
            var userMarker = new google.maps.Marker({
                map: map,
                position: pos,
                icon:{url:'img/Goldy.png', scaledSize: new google.maps.Size(25, 25)},
            });
            markers.push(userMarker);
    
            google.maps.event.addListener(userMarker, 'click', function() {
                infowindow2.setContent('Your location');
                infowindow2.open(map, this);
            });

            directionsRenderer.setMap(map);
           directionsRenderer.setPanel(document.getElementById("sidebar"));
           })
           

           }
           else{
               alert("Fail to get current position\n");
            }
        
        

        var addresses=[]
        var names = []
        var times = []
        var days = []
        var daysOB = document.querySelectorAll('.day');
        var addressesOB = document.querySelectorAll('.address');
        var namesOB = document.querySelectorAll('.name');
        var timesOB = document.querySelectorAll('.time');

       for (var i=0;i<addressesOB.length;i++) {
        addresses[i] = addressesOB[i].textContent ;
        times[i]=timesOB[i].textContent;
        names[i]=namesOB[i].textContent;
        days[i]=daysOB[i].textContent;
       }
       for(var i=0;i<addresses.length;i++){
        geocodeAddress(geocoder, map, addresses[i],times[i],names[i],days[i]);  
       }

       
        document.getElementById('search').addEventListener('click', function() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        searchNearbyPlaces();});

        document.getElementById('go').addEventListener('click', function() {
        
        getDirection();});

        document.getElementById('type').addEventListener("change", function() {
            if (this.value == "other") {
                document.getElementById('keyword').style.display = 'block';
            }
        });
    }

    function getDirection(){
        
           
           var modes=[];
            modes = document.getElementsByName('mode');
            var end = document.getElementById('destination').value;
            for(var i=0;i<modes.length;i++){
                if(modes[i].checked){
                    var mode = modes[i].value;
                    var request = {
                origin: pos,
                destination: end,
                travelMode: mode,
            };
            }
            }
            
            directionsService.route(request, function(result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                    
                }
    });
        
    }


    function searchNearbyPlaces(){
        map.setCenter(pos);
        //Put marker of the Geolocated user location
        var userMarker = new google.maps.Marker({
            map: map,
            position: pos
        });
        markers.push(userMarker);

        google.maps.event.addListener(userMarker, 'click', function() {
            infowindow2.setContent('Your location');
            infowindow2.open(map, this);
        });

        var typefind = document.getElementById('type').value;
        var rad = document.getElementById('radius').value;
        var key = document.getElementById('keyword_input').value;
        var request = {
            location: pos,
            radius: rad,
            type: typefind,
            keyword: key,
        };
        service.nearbySearch(request, callback);
    }
    
    
    //Portion that reuses Prof's demo code
    // This function takes a geocode object, a map object, and an address, and 
    // if successful in finding the address, it places a marker with a callback that shows an 
    // info window when the marker is "clicked"
    function geocodeAddress(geocoder, resultsMap, address,time,day,name) {
 
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                    resultsMap.setCenter(results[0].geometry.location);
                    marker2 = new google.maps.Marker({
                                map: resultsMap,
                                position: results[0].geometry.location,
                                icon:{url:'img/Goldy.png', scaledSize: new google.maps.Size(25, 25)},
                                title:address
                                });
                    markers.push(marker2);
                    infowindow2 = new google.maps.InfoWindow({
                                content: address+" "+time+" "+day+" "+name
                                });
    
                    google.maps.event.addListener(marker2, 'click', createWindow(resultsMap,infowindow2, marker2));
            } else {
                    alert('Geocode was not successful for the following reason: ' + status);
            } //end if-then-else
        }); // end call to geocoder.geocode function
    } // end geocodeAddress function
    
    // Function to return an anonymous function that will be called when the rmarker created in the 
    // geocodeAddress function is clicked	
    function createWindow(rmap, rinfowindow, rmarker){
              return function(){
                rinfowindow.open(rmap, rmarker);
            }
    }//end create (info) window

    //nearby search

    function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(place);
        }
    }
}

function createMarker(place){
    var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
});
markers.push(marker);

google.maps.event.addListener(marker, 'click', function() {
    infowindow2.setContent(place.name);
    infowindow2.open(map, this);
});
}

window.initMap = initMap;

