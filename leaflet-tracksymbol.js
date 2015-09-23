/**
 * Tracksymbol for leaflet
 * @class TrackSymbol
 * @constructor
 */
L.TrackSymbol = L.Path.extend({

  initialize: function (latlng, options) {
    L.Path.prototype.initialize.call(this, options);
    options = options || {};
    this._id = options.trackId || 0;
    this._latlng = L.latLng(latlng);
    this._size = options.size || 24;
    this._heading = options.heading || 0.0;
    this._course = options.course || 0.0;
    this._speed = options.speed || 0.0;
    this._triSymbol = [0.75,0, -0.25,0.3, -0.25,-0.3];
  },

  setLatLng: function (latlng) {
    this._latlng = L.latLng(latlng);
    return this.redraw();
  },
  
  setSpeed: function( speed ) {
    this._speed = speed;
    return this.redraw();
  },
  
  setCourse: function( course ) {
    this._course = course;
    return this.redraw();
  },

  getTrackId: function() {
    return this._trackId;
  },

  _getLatSize: function () {
    return (this._size / 40075017) * 360;
  },

  _getLngRadius: function () {
    return ((this._size / 40075017) * 360) / Math.cos(L.LatLng.DEG_TO_RAD * this._latlng.lat);
  },

  getBounds: function () {
     var lngSize = this._getLngSize();
     var latSize = this._getLatSize();
     var latlng = this._latlng;
     return new L.LatLngBounds(
            [latlng.lat - latSize, latlng.lng - lngSize],
            [latlng.lat + latSize, latlng.lng + lngSize]);
  },

  getLatLng: function () {
    return this._latlng;
  },

  _rotate: function(point, angle) {
    var x = point[0];
    var y = point[1];
    var si_z = Math.sin(angle);
    var co_z = Math.cos(angle);
    var newX = x * co_z - y * si_z;
    var newY = x * si_z + y * co_z;
    return [newX, newY];
  },

  _rotateAllPoints: function(points, angle) {
    var result = [];
    for(var i=0;i<points.length;i+=2) {
      var x = points[i + 0] * this._size;
      var y = points[i + 1] * this._size;
      var pt = this._rotate([x, y], angle);
      result.push(pt[0]);
      result.push(pt[1]);
    }
    return result;
  },

  _transformAllPointsToView: function(points) {
    var result = [];
    var symbolViewCenter = this._map.latLngToLayerPoint(this._latlng);
    for(var i=0;i<points.length;i+=2) {
      var x = symbolViewCenter.x + points[i+0];
      var y = symbolViewCenter.y - points[i+1];
      result.push(x);
      result.push(y);
    }
    return result;
  },

  _createPathFromPoints: function(points) {
    var result;
    for(var i=0;i<points.length;i+=2) {
      var x = points[i+0];
      var y = points[i+1];
      if(result === undefined)
        result = 'M ' + x + ' ' + y + ' ';
      else
        result += 'L ' + x + ' ' + y + ' ';
    }
    return result + ' Z';
  },

  getPathString: function () {
    var angle = Math.PI/2.0 - this._heading;
    var viewPoints = this._transformAllPointsToView( this._rotateAllPoints(this._triSymbol, angle) );
    return this._createPathFromPoints(viewPoints);
  }
});

L.trackSymbol = function (latlng, options) {
    return new L.TrackSymbol(latlng, options);
};

