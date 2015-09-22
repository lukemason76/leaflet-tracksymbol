var TrackLayer = (function () {
    var mmsiToMarker = {};
    var aislayer = L.featureGroup([]);

    var addTrackMarker = function(llPoint) {
        var marker = L.TrackSymbol(llPoint);
        marker.addTo(aislayer);
    };

}());

