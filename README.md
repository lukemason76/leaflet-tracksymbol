This is a symbol for leaflet-layers showing tracks with speed, course and heading.
The source code can be found on [github].

Example
-------

	var latlng = L.latLng(20, 30);
	var speed = 10.0 // In m/s
	var course = 45.0 * Math.PI / 180.0; // Radians from north
	var heading = 45.0 * Math.PI / 180.0; // Radians from north

	var trackMarker = L.trackSymbol(latlng, {
        	trackId: 123,
       		fill: true,
        	fillColor: '#0000ff',
        	fillOpacity: 1.0,
        	stroke: true,
        	color: '#000000',
       		opacity: 1.0,
       		weight: 1.0,
        	speed: speed,
        	course: course,
        	heading: heading
      	});

	trackMarker.addTo(map);


[github]: https://github.com/lethexa/leaflet-tracksymbol "Tracksymbol GitHub repository"
