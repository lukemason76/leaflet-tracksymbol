leaflet-tracksymbol
-------------------

This is a symbol for leaflet-layers showing tracks with speed, course and heading.


The visualization is chosen by zoomlevel or heading availability.
 * If zoomlevel is smaller than 'minSilouetteZoom' a triangular symbol is rendered.
 * If zoomlevel is greater than 'minSilouetteZoom' a ship silouette is rendered.
 * If heading is undefined a diamond symbol is rendered.


The following options are available:
 * trackId: The unique id of the symbol (default: 0).
 * size: Static size of the symbol in pixels (default:24).
 * heading: Initial heading of the symbol (default: undefined).
 * course: Initial course of the symbol (default: undefined).
 * speed: Initial speed of the symbol-leader (default: undefined).
 * leaderTime: The length of the leader in seconds (speed * leaderTime) (default:60).
 * minSilouetteZoom: The zoomlevel to switch from triangle to silouette (default:13).
 * gpsRefPos: Initial GPS offset of the symbol (default: undefined).
 * defaultSymbol: The triangular track symbol. Contains an array of n numbers. [x1,y1,x2,y2,...]
 * noHeadingSymbol: The diamond track symbol. Contains an array of n numbers. [x1,y1,x2,y2,...]
 * silouetteSymbol: The ship track symbol. Contains an array of n numbers. [x1,y1,x2,y2,...]


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


![alt tag](https://raw.github.com/lethexa/leaflet-tracksymbol/branch/master/example.png)

[github]: https://github.com/lethexa/leaflet-tracksymbol "Tracksymbol GitHub repository"
