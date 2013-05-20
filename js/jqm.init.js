	
	/* 
		jquery mobile page inits 
	*/

	$(document).bind("mobileinit", function() {
		// for phonegap
		$.support.cors = true;
		$.mobile.allowCrossDomainPages = true;		
		$.mobile.touchOverflowEnabled = true;
		
		//not working yet :( dunno y
		$.mobile.page.prototype.options.addBackBtn = true;

	});


	$(document).bind("pagebeforechange", function( event, data ) {
		$.mobile.pageData = (data && data.options && data.options.pageData)
			? data.options.pageData
			: null;
	});


	$( document ).delegate("#home","pageinit", function(e){
	
		navigator.geolocation.getCurrentPosition(
			function(position){
			
				$lat = position.coords.latitude;
				$lng = position.coords.longitude;
				
				log("success getCurrentPosition()")

				$.mobile.showPageLoadingMsg ()

				$.ajax({
					url: $host + "/api/v1/parking/?format=json&limit=1&refPoint=%7B%22coordinates%22:%5B" + $lng + "," + $lat + "%5D,%22type%22:%20%22Point%22%7D&radius=99999&order_by=distance",
					cache: false,
					dataType: "json",
					success: function(data){ 
						log("success getNearestLocation()")
						log(data.meta['limit'])
						
						$me = new google.maps.LatLng($lat, $lng)
						$name = data.objects["0"].description
						$lat = data.objects["0"].geoPoint.coordinates["1"]
						$lng = data.objects["0"].geoPoint.coordinates["0"]

						$('#home div[data-role="content"] h3 span').html($name)

						var $ps = new google.maps.LatLng($lat, $lng)
						,	zoom = 14
						, 	mapCenter = $ps						
						, 	map_canvas = $('#map_canvas_home')[0] 		
						, 	mapconfig = {			
								mapTypeId: google.maps.MapTypeId.HYBRID,			
								center: mapCenter,
								zoom: zoom,
								mapTypeControl: false,
								streetViewControl: false		
							}					
						,	map = new google.maps.Map(map_canvas, mapconfig)
						, 	marker_me = new google.maps.Marker({
								position: $me,
								animation: 2
							})
						,	marker_parkplatz = new google.maps.Marker({
								position: $ps,
								animation: 2
							})
						
						marker_me.setMap(map)
						marker_parkplatz.setMap(map);	
						
						$.mobile.hidePageLoadingMsg()

					}
				});
			  
			},
			function(error){
				log("#home getCurrentPosition error")				
			},
			{
				/*timeout: 10000 ,maximumAge:600000*/
			}
		);

		
	
	});
	
	$( document ).delegate("#mapview","pagebeforeshow", function(e, data){
	
		var p = new google.maps.LatLng($.mobile.pageData.lat, $.mobile.pageData.lng);

		var zoom = 14
		, 	mapCenter =  p
		, 	mapconfig = {			
				mapTypeId: google.maps.MapTypeId.HYBRID,			
				center: mapCenter,
				zoom: zoom,
				streetViewControl: false
			}		
		, 	map_canvas = $('#map_canvas')[0] 		
	
		map = new google.maps.Map(map_canvas, mapconfig)

		var marker = new google.maps.Marker({
			position: p,
			animation:2
		});

		marker.setMap(map);
	
	});
	