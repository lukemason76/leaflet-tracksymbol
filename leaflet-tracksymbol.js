/**
 * Tracksymbol for leaflet
 * @class TrackSymbol
 * @constructor
 */
L.TrackSymbol = L.Path.extend({

  initialize: function (latlng, options) {
    L.Path.prototype.initialize.call(this, options);
    this._latlng = L.latLng(latlng);
    this._size = options.size || 16;
    this._heading = options.heading || 0.0;
    this._course = options.course || 0.0;
    this._speed = options.speed || 0.0;
    this._triSymbol = [2,0, 0,1, 0,-1];
  },

  setLatLng: function (latlng) {
    this._latlng = L.latLng(latlng);
    return this.redraw();
  },
  
  setSpeed: function( speed ) {
    this._speed = speed;
  },
  
  setCourse: function( course ) {
    this._course = course;
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
      var x = points[i + 0];
      var y = points[i + 1];
      var pt = rotate([x, y], angle);
      result.push(pt[0]);
      result.push(pt[1]);
    }
    return result;
  },

  _createPathFromPoints: function(points) {
    var result;
    for(var i=0;i<points.length;i+2) {
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
    var viewPoints = rotateAllPoints(this._triSymbol, this._course);
    return createPathStringFromPoints(viewPoints);
  }
});

L.trackSymbol = function (latlng, options) {
    return new L.TrackSymbol(latlng, options);
};

