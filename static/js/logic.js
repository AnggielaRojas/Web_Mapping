// get URL 
var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// set d3.json
d3.json(earthquakeURL, function(data){
  createFeatures(data.features);
});
// get all features for map
function createFeatures(earthquakeData) {
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>Magnitude: " + feature.properties.mag +"</h3><h3>Location: "+ feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    },
// properties of circles    
    pointToLayer: function (feature, latlng) {
      return new L.circle(latlng,
        {radius: getRadius(feature.properties.mag),
        fillColor: getColor(feature.properties.mag),
        fillOpacity: .8,
        color: "#000",
        weight: .4
    })
  }
  });

  createMap(earthquakes);
}
// get map

function createMap(earthquakes) {

    var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}",{
        accessToken:API_KEY
      });
      
    var baseMaps = {
      "Outdoors": outdoors,
    };
    var overlayMaps = {
      "Earthquakes": earthquakes
    };
// get map shown
    var myMap = L.map("map", {
      center: [
        37.00, -95.00],
      zoom: 5.4,
      layers: [outdoors, earthquakes]
    }); 

    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

};

function getColor(Magnitude) {
  if (Magnitude > 5) {
    return "orange";
  } else if (Magnitude > 4) {
    return "blue";
  } else if (Magnitude > 3) {
    return "yellow";
  } else if (Magnitude > 2) {
    return "lightblue";
  } else if (Magnitude > 1) {
    return "white";
  } else {
    return "pink";
  }
}
  function getRadius(value){
    return value*25000
  }