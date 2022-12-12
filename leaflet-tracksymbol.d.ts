import 'leaflet';
declare module 'leaflet' {
	interface TrackSymbolOptions extends PathOptions {
		trackId?: number;
		size?: number;
		heading: number;
		course: number;
		speed: number;
		leaderTime?: number;
		minSilouetteZoom?: number;
		gpsRefPos: [number, number, number, number];
		defaultSymbol?: number[];
		noHeadingSymbol?: number[];
		silouetteSymbol?: number[];
	}

	/**
	  * Tracksymbol for leaflet.
	  * The visualization is chosen by zoomlevel or heading availability.
	  * If zoomlevel is smaller than 'minSilouetteZoom' a triangular symbol is rendered.
	  * If zoomlevel is greater than 'minSilouetteZoom' a ship silouette is rendered.
	  * If heading is undefined a diamond symbol is rendered.
	  * The following options are available:
	  * <ul>
	  *   <li>trackId: The unique id of the symbol (default: 0). </li>
	  *   <li>size: Static size of the symbol in pixels (default:24). </li>
	  *   <li>heading: Initial heading of the symbol (default: undefined). </li>
	  *   <li>course: Initial course of the symbol (default: undefined). </li>
	  *   <li>speed: Initial speed of the symbol-leader (default: undefined). </li>
	  *   <li>leaderTime: The length of the leader (speed * leaderTime) (default:60s). </li>
	  *   <li>minSilouetteZoom: The zoomlevel to switch from triangle to silouette (default:14). </li>
	  *   <li>gpsRefPos: Initial GPS offset of the symbol (default: undefined). </li>
	  *   <li>defaultSymbol: The triangular track symbol. Contains an array of n numbers. [x1,y1,x2,y2,...] </li>
	  *   <li>noHeadingSymbol: The diamond track symbol. Contains an array of n numbers. [x1,y1,x2,y2,...] </li>
	  *   <li>silouetteSymbol: The ship track symbol. Contains an array of n numbers. [x1,y1,x2,y2,...] </li>
	  * </ul>
	  * @class TrackSymbol
	  * @constructor
	  * @param latlng {LanLng} The initial position of the symbol.
	  * @param options {Object} The initial options described above.
	  */
	class TrackSymbol extends Path {
		protected _id: number;
		protected _leaflet_id: number;
		protected _latlng: LatLng;
		protected _size: number;
		protected _heading: number;
		protected _course: number;
		protected _speed: number;
		protected _leaderTime: number;
		protected _minSilouetteZoom: number;
		protected _gpsRefPos: [number, number, number, number];
		protected _triSymbol: number[];
		protected _diaSymbol: number[];
		protected _silSymbol: number[];

		constructor(latlng: LatLngTuple | [number, number, number] | LatLngLiteral | { lat: number, lng: number, alt?: number | undefined }, options?: TrackSymbolOptions);

		/**
		  * Set latitude/longitude on the symbol.
		  * @method setLatLng
		  * @param latlng {LatLng} Position of the symbol on the map.
		  */
		setLatLng(latlng: LatLngTuple | [number, number, number] | LatLngLiteral | { lat: number, lng: number, alt?: number | undefined }): this;

		/**
		  * Set the speed shown in the symbol [m/s].
		  * The leader-length is calculated via leaderTime.
		  * @method setSpeed
		  * @param speed {Number} The speed in [m/s].
		  */
		setSpeed(speed: number): this;

		/**
		  * Sets the course over ground [rad].
		  * The speed-leader points in this direction.
		  * @method setCourse
		  * @param course {Number} The course in radians.
		  */
		setCourse(course: number): this;
		
		/**
		  * Sets the heading of the symbol [rad].
		  * The heading rotates the symbol.
		  * @method setHeading
		  * @param course {Number} The heading in radians.
		  */
		setHeading(heading: number): this;

		/**
		  * Sets the leaderTime of the symbol [seconds].
		  * @method setLeaderTime
		  * @param leaderTime {Number} The leaderTime in seconds.
		  */
		setLeaderTime(leaderTime: number): this;

		/**
		  * Sets the position offset of the silouette to the center of the symbol.
		  * The array contains the refpoints from ITU R-REC-M.1371-4-201004 page 108
		  * in sequence A,B,C,D.
		  * @method setGPSRefPos
		  * @param gpsRefPos {Array} The GPS offset from center.
		  */
		setGPSRefPos(gpsRefPos: [number, number, number, number]): this;

		/**
		  * Returns the trackId.
		  * @method getTrackId
		  * @return {Number} The track id.
		  */
		getTrackId(): number;

		/**
		  * Returns the bounding box of the symbol.
		  * @method getBounds
		  * @return {LatLngBounds} The bounding box.
		  */
		getBounds(): LatLngBounds;

		/**
		  * Returns the position of the symbol on the map.
		  * @mathod getLatLng
		  * @return {LatLng} The position object.
		  */
		getLatLng(): LatLng;

		/**
		  * Generates the symbol as SVG path string.
		  * depending on zoomlevel or track heading different symbol types are generated.
		  * @return {String} The symbol path string.
		  */
		getPathString(): String;

	}

	/**
	  * Creates a TrackSymbol
	  * @param latlng e.g. [10, 20] or L.latLng(54.15, 8.0)
	  * @param options (optional) set of options wich includes size, heading, course, speed, ...
	  * @example
	  * let course = 0.0;
	  * let ts = L.trackSymbol([54.15, 8.0], {
	  * 	fill: true,
	  * 	stroke: true,
	  * 	speed: 10.0,
	  * 	course: course * Math.PI / 180.0,
	  * 	heading: course * Math.PI / 180.0,
	  * 	gpsRefPos: [100, 100, 20, 20],
	  * 	fillColor: "#0000ff",
	  * 	color: "#000000",
	  * 	weight: 2,
	  * 	opacity: 1,
	  * 	fillOpacity: 1
	  * });
	  */
	function trackSymbol(latlng?: LatLngTuple | [number, number, number] | LatLngLiteral | { lat: number, lng: number, alt?: number | undefined }, options?: TrackSymbolOptions): TrackSymbol;
}
