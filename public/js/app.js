"use strict";
(function () {
  var placeData = [ ];
  var currentLocation = {};

  

  function codeLatLng( locString,callback) {
    var geoLoc = {
      intLat: 0.0,
      intLng: 0.0
    }
     var geocoder = new google.maps.Geocoder();
     var address = locString;
     var startLocation =  geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
         geoLoc.intLat = parseFloat(results[0].geometry.location.lat());
         geoLoc.intLng = parseFloat(results[0].geometry.location.lng());
         console.log(results)
           callback(geoLoc);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
       return geoLoc;
    });
   }
   

 console.log();
  /// 
	console.log("js is loaded")
   getPlaceType("art_gallery");

function getPlaceType(typeVal, addr) {
  var lat;
  var lng;
  if ( currentLocation.lat === undefined) {
     lat = 41.65053;
     lng = -73.932648;
     console.log('Location is undefined, so it is using hardcododing! ');
     console.log(lat);
  } else {
     lat = currentLocation.lat;
     lng = currentLocation.lng;
  }

   	 $.post('place', { type: typeVal, lat: lat,  lng: lng}, 
  function(json){
      placeData = [];//reset the array back to empty
		$.each(json.results, function( index, value ) {
        var $ul = $('<ul class="place-name"></ul>');
   		  var $p= $('<p class="h5"></p>');
   		  var $lat = $('<li class="lat"></li>');
   		  var $lng = $('<li class="lng"></li>')
   		  var $id = $('<li class="place-id"></li>')
        var $photo_id = $('<li class="photo-id"></li>')

       placeData[index] = {name: value.name, id: value.place_id}; //sets the place data
   		  $p.html(value.name);
        if (value.photos != undefined){
            console.log(value.photos[0].photo_reference);
           $photo_id.html(value.photos[0].photo_reference)
        }
        
   		  $lat.html(value.geometry.location.lat);
   		  $lng.html(value.geometry.location.lng);
   		  $id.html(value.place_id);

	   		$ul.append($p);
	   		$ul.append($lat);
	   		$ul.append($lng);
	   		$ul.append($id);
        $ul.append($photo_id);
	   		$('#bus-name').append($ul);
   	})
     	 addCsvButton(); 
  });
}


 	$('.type-select').change(function(){
     console.log(currentLocation);
 		$(".place-name").remove();
 		 getPlaceType($(this).val());
 	})

  //google maps api code
     //call the function that gets and sets cords 
codeLatLng('2265 South Road, Poughkeepsie, NY', function(addr){
  console.log('the callback is being called');
  console.log(addr);
  var mapOptions = {
		 center: new google.maps.LatLng(addr.intLat,addr.intLng),
		 zoom: 12,
	 mapTypeId: google.maps.MapTypeId.ROADMAP
	};
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var markerOptions = {
  position: new google.maps.LatLng(addr.intLat, addr.intLng)
  };
  var marker = new google.maps.Marker(markerOptions);
  marker.setMap(map);
    
});
$(document).on('click', '.place-name', getLocation);

  function getLocation() {
 	  var thisChildren = $(this).children();
    var pName  = thisChildren[0].innerHTML;
	  var latVal = thisChildren[1].innerHTML;
	  var lngVal = thisChildren[2].innerHTML;
	  var idVal =  thisChildren[3].innerHTML;
    var photo_ref =  thisChildren[4].innerHTML;
	  console.log("photo ref");
    console.log(photo_ref);

	  var mapOptions = {
			center: new google.maps.LatLng(latVal,lngVal),
			zoom: 11,
		  	mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var request = {
		  placeId: idVal
		};

		var service = new google.maps.places.PlacesService(map);
		service.getDetails(request, callback);

	  function callback(place, status) {
			console.log(place);
		  if (status == google.maps.places.PlacesServiceStatus.OK) {

				var map = new google.maps.Map(document.getElementById('map'), mapOptions);

				var markerOptions = {
					position: new google.maps.LatLng(latVal, lngVal)
				};
				var marker = new google.maps.Marker(markerOptions);
				marker.setMap(map);

       
        $.get('photos/'+ photo_ref, 
          function(json){
              console.log(json);
              if (json == "The file was successfully uploaded!") {
               
              $("#place-photo").attr("src", "uploads/" +photo_ref+".png");
                 
              }
      
          });

				var infoWindowOptions = {
					content: '<img src="' + '">' +place.formatted_address + '<br><br>' + place.formatted_phone_number
				};
				var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
				google.maps.event.addListener(marker,'click',function(e){
					infoWindow.open(map, marker);
				});
	 	  } 
	 }
};

  $('.right').click(function(e){
    console.log("the littel guy has been clicked")
    e.preventDefault()
   
    $( ".chnage-loc" ).slideDown( 1000, function() {
      $( this )
        .filter( ".middle" )
          .css( "background", "yellow" )
          .focus(); 
    });
  });

  $('.left').click(function(e){
    console.log("the littel guy has been clicked")
    e.preventDefault()
   
    $( ".chnage-loc" ).slideUp( 1000, function() {
      $( this )
        .filter( ".middle" )
        .css( "background", "yellow" )
        .focus();
   
    });
  });
  
  

  $('.send-btn').on('click', function() {
    var $location = $('#location-input').val();
     $('#location-input').html(' ');
    console.log($location);
    codeLatLng($location, function(addr){
      
      console.log('the callback is being called');
    
      console.log(addr);
      var mapOptions = {
         center: new google.maps.LatLng(addr.intLat,addr.intLng),
         zoom: 12,
       mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      var markerOptions = {
      position: new google.maps.LatLng(addr.intLat, addr.intLng)
      };
      var marker = new google.maps.Marker(markerOptions);
      marker.setMap(map);      

   var lat;
   var lng;
   var typeVal = "art_gallery"
  if ( addr === undefined) {
     lat = 41.65053;
     lng = -73.932648;
     console.log('Location is undefined, so it is using hardcododing! ');
     console.log(lat)
  } else { // here is where we update currentLocation data
     lat = addr.intLat
     lng = addr.intLng;
     currentLocation.lat = addr.intLat;
     currentLocation.lng = addr.intLng;

  }
    
     $.post('place', { type: typeVal, lat: lat,  lng: lng}, 
  function(json){
    $(".place-name").remove();
    placeData = [];
    $.each(json.results, function( index, value ) {
    
        var $ul = $('<ul class="place-name"></ul>');
        var $p= $('<p class="h5"></p>');
        var $lat = $('<li class="lat"></li>');
        var $lng = $('<li class="lng"></li>')
        var $id = $('<li class="place-id"></li>')
        var $photo_id = $('<li class="photo-id"></li>')
        $p.html(value.name);
        if (value.photos != undefined){
            console.log(value.photos[0].photo_reference);
           $photo_id.html(value.photos[0].photo_reference)
        }
        placeData[index] = {name: value.name, id: value.place_id};
        $lat.html(value.geometry.location.lat);
        $lng.html(value.geometry.location.lng);
        $id.html(value.place_id);
        $ul.append($p);
        $ul.append($lat);
        $ul.append($lng);
        $ul.append($id);
        $ul.append($photo_id);
        $('#bus-name').append($ul);

    })
      addCsvButton(); 
   });

  })
  });
 
 function addCsvButton() {
  if ( $('.csv-btn')){
     $('.csv-btn').remove();
    }
    var $a = $('<a id="dataLink" ></a>');
    var $button = $('<button class="csv-btn">Download CSV</button>');
    $('#bus-name').append($button);
    $('#bus-name').append($a);
        
 }

//start of code to export the list as a csv file
$('body').on('click', '.csv-btn', loopArray);
     
    var $link = $("#dataLink");
    var name;
    var id;
    var address; 
    var addressArray = []
    var csv = " ";  
    var x = 0;
    function loopArray() {
     if (x !==20){ 
     if(x === 10 || x === 15) {
     setTimeout(function(){

      var request = {
        placeId: placeData[x].id
       };
     var service = new google.maps.places.PlacesService(map);
          service.getDetails(request, callback2);

     }, 2500);
     }
    console.log(placeData[x].id)
    var request = {
        placeId: placeData[x].id
       };
     var service = new google.maps.places.PlacesService(map);
          service.getDetails(request, callback2);
          
    } else {
      console.log("we made it ");
         var regex = new RegExp(',', 'g')
         var name = '';
         
       for (var i=0; i<addressArray.length; i++) {
                name = placeData[i].name; 
                name = name.replace(regex,'');
                csv +=  name + "," + addressArray[i] + "\n"; 
               };
               console.log(csv);
               $("#dataLink").attr("href", 'data:Application/octet-stream,' + encodeURIComponent(csv))[0].click();
    }

}

 function callback2(place, status) {
      console.log(place);
      if (status == google.maps.places.PlacesServiceStatus.OK){
        console.log(place.formatted_address);
        addressArray.push(place.formatted_address);
          if(x !== addressArray.length) {
              x++;
              console.log(x);
              loopArray();   
            }else {
              x = 0;
              console.log("we made it too the for loop")
             
            }
     
      }
    }
         
    










//code for auto complete input box to get a place.
$('#autocomplete').focus(function(){

  var mapOptions = {
         center: new google.maps.LatLng(41.69463200000001, -73.935952),
         zoom: 12,
         mapTypeId: google.maps.MapTypeId.ROADMAP
        };
      
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

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
});


})();