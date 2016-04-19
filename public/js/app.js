"use strict";
(function () {
	console.log("js is loaded")
  $.ajax({
       url: '/place' 
     })
     .done(function(json) {
     	$.each(json.results, function( index, value ) {
     		console.log(value.name);
     		console.log (value.geometry.location.lat)
     		console.log(value.geometry.location.lng)
     		 var $ul = $('<ul class="place-name"></ul>');
     		 var $p= $('<p class="h5"></p>');
     		 var $lat = $('<li class="lat"></li>');
     		 var $lng = $('<li class="lng"></li>')
     		 $p.html(value.name);
     		 $lat.html(value.geometry.location.lat);
     		 $lng.html(value.geometry.location.lng);

     		$ul.append($p);
     		$ul.append($lat);
     		$ul.append($lng);
     		$('#bus-name').append($ul);
     		
     		$('#bus-name').append($ul);


     	
     	})
     	 // console.log(json.results.each)
      })
      .fail(function() {
        alert("Ajax failed to fetch data");
      })

      //google maps api code
      var mapOptions = {
    center: new google.maps.LatLng(41.65053,-73.932648),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

 $(document).on('click', '.place-name', getLocation);
 function getLocation() {
 	 console.log("This method works!");
 	 var thisChildren = $(this).children();
 	 console.log(thisChildren[2].innerHTML);
   var pName  = thisChildren[0].innerHTML;
	 var latVal = thisChildren[1].innerHTML;
	 var lngVal = thisChildren[2].innerHTML;

			console.log(parseInt(latVal));
			console.log(parseInt(lngVal));
			 var mapOptions = {
    				center: new google.maps.LatLng(latVal,lngVal),
    				zoom: 10,
   				 mapTypeId: google.maps.MapTypeId.ROADMAP
				};
			var map = new google.maps.Map(document.getElementById('map'), mapOptions);

			var markerOptions = {
		position: new google.maps.LatLng(latVal, lngVal)
		};
			var marker = new google.maps.Marker(markerOptions);
			marker.setMap(map);
			var infoWindowOptions = {
    	content: pName
		};
		var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
		google.maps.event.addListener(marker,'click',function(e){
  
  infoWindow.open(map, marker);

});
		
};

 
var map = new google.maps.Map(document.getElementById('map'), mapOptions);

var markerOptions = {
    position: new google.maps.LatLng(41.69463200000001, -73.935952)
};
var marker = new google.maps.Marker(markerOptions);
marker.setMap(map);




var acOptions = {
  types: ['establishment']
};
var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),acOptions);
autocomplete.bindTo('bounds',map);
var infoWindow = new google.maps.InfoWindow();
var marker = new google.maps.Marker({
  map: map
});

google.maps.event.addListener(autocomplete, 'place_changed', function() {
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  infoWindow.close();
  var place = autocomplete.getPlace();
  if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport);
  } else {
    map.setCenter(place.geometry.location);
    map.setZoom(17);
  }
  marker.setPosition(place.geometry.location);
  infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
  infoWindow.open(map, marker);
  google.maps.event.addListener(marker,'click',function(e){

    infoWindow.open(map, marker);

  });
});


})();