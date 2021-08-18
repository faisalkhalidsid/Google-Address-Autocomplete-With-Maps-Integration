// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;
  var geocoder;



var globalMarker;
var country = "ae";

function addAutoComplete(){
    
    
    
var input = document.createElement("input");
input.type = "text";
input.setAttribute("id","search-location");

 
    
    
map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
    
    
    
const options = {
  componentRestrictions: { country: country },
  fields: ["geometry"],
  strictBounds: false
};
var autocomplete = new google.maps.places.Autocomplete(input, options);
    
    
  autocomplete.addListener('place_changed', () => {
     // alert("changed");
      
      
      var place = autocomplete.getPlace();
      
      
      console.log(autocomplete.getPlace());
      
      
      setAddressFromGeolocation(place.geometry.location);
      
          if (globalMarker != null){    
              map.panTo(place.geometry.location);
              
          globalMarker.setPosition(place.geometry.location);
          }
      
      
      
  });  
    
    
    
    
    
}
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 25.3462, lng: 55.4211 },
    zoom: 15,
  });
    
  globalMarker = new google.maps.Marker({
    position: { lat: 25.3462, lng: 55.4211 },
    title:"Hello World!",
                  map:map
});   
    
    
    
          geocoder = new google.maps.Geocoder();
    
    
    setAddressFromGeolocation({ lat: 25.3462, lng: 55.4211 });

    addAutoComplete();
    
    

     map.addListener("dragend", () => {
         setAddressFromGeolocation(map.center);
         
     });
    
    
      map.addListener("center_changed", () => {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
          
          

          
          var loc = {
              lat:map.center.lat(),
              lng:map.center.lng()
          }
          
          
          if (globalMarker != null){          
          globalMarker.setPosition(loc);
          }
          

          
  });
    
    
    
    
    
    
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
            
          
            
         setAddressFromGeolocation(pos);   
            
      
            
          map.setCenter(pos);
                  globalMarker.setPosition(pos);

        },
        () => {
         //handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
     // handleLocationError(false, infoWindow, map.getCenter());
    }    
    
    
}



function setAddressFromGeolocation(loc){
    
              geocoder.geocode( { 'location': loc}, function(results, status) {
      if (status == 'OK') {
          
        
          
          
          document.getElementById("address").innerHTML = "<b>"+results[0].formatted_address+"</b>";

          
   
          
    }});
}
