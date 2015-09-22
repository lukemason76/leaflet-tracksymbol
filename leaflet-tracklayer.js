var L.TrackLayer = function() {
  var aislayer = L.featureGroup([]);

  this.addTrackMarker = function(llPoint) {
    var marker = L.trackSymbol(llPoint);
    marker.addTo(aislayer);
  };
};

var L.trackLayer = function() {
  return new L.TrackLayer();
};

