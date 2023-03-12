function initMap() {
  var origin = {lat:44.9727,lng:-93.23540000000003};
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: origin,
  });
  

 
  google.maps.event.addListener(map, 'click',function(event){
    var clickedLat = event.latLng.lat();
    var clickedLng = event.latLng.lng();
    var geocoder = new google.maps.Geocoder();
  geocoder.geocode(
    {
      location: { lat: clickedLat, lng: clickedLng },
    },
    function (results, status) {
      if (status === "OK") {
        var address = results[0].formatted_address;
        document.getElementById('location').value = address;}});
  });
}




window.initMap = initMap;