L.TrackLayer = function() {
  var aislayer = L.featureGroup([]);

  this.addTrack = function(marker) {
    marker.addTo(aislayer);
  };

  this.addTo = function(map) {
    aislayer.addTo(map);
  };
};

L.trackLayer = function() {
  return new L.TrackLayer();
};

