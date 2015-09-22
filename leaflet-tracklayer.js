L.TrackLayer = function() {
  var aislayer = L.featureGroup([]);

  this.addTrackMarker = function(llPoint) {
    var marker = L.trackSymbol(llPoint);
    marker.addTo(aislayer);
  };
};

L.trackLayer = function() {
  return new L.TrackLayer();
};

