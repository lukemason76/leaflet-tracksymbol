var L.TrackLayer = function () {
  var mmsiToMarker = {};
  var aislayer = L.featureGroup([]);

  var addTrackMarker = function(llPoint) {
    var marker = L.trackSymbol(llPoint);
    marker.addTo(aislayer);
  };

};

var L.trackLayer = function() {
  return new L.TrackLayer();
};

