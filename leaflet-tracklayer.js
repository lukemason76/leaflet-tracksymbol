L.TrackLayer = function() {
  var aislayer = L.featureGroup([]);

  this.addTrack = function(marker) {
    marker.addTo(aislayer);
  };

  this.removeTrack = function(marker) {
    marker.removeLayer(aislayer);
  };


  this.addTo = function(map) {
    aislayer.addTo(map);
  };
  
  this.clearLayers = function() {
    aislayer.clearLayers();
  };
};

L.trackLayer = function() {
  return new L.TrackLayer();
};

