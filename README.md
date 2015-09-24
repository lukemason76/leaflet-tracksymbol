This is a symbol for leaflet-layers showing tracks with speed, course and heading.

Example
-------

	var latlng = L.latLng(20, 30);

	var trackMarker = L.trackSymbol(latlng, {
        	trackId: 123,
       		fill: true,
        	fillColor: '#0000ff',
        	fillOpacity: 1.0,
        	stroke: true,
        	color: '#000000',
       		opacity: 1.0,
       		weight: 1.0,
        	speed: track.speed,
        	course: track.course,
        	heading: track.heading
      	});

	trackMarker.addTo(map);

