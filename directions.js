const MAP_DIV = document.getElementById('map');
const PANEL_DIV = document.getElementById('panel')

const ORIGIN_POINT = new google.maps.LatLng(-12.0346, -77.0122)
const DESTINY_POINT = new google.maps.LatLng(-11.9612, -76.9842)

const RENDERER_PROPERTY = {
  draggable: true, //Take and move mark
  //suppressMarkers: true
}

const DIRECTION_SERVICE = new google.maps.DirectionsService();
const DIRECTION_DISPLAY = new google.maps.DirectionsRenderer(RENDERER_PROPERTY);


const MAP_PROPERTY = {
  zoom: 10,
  center: ORIGIN_POINT,
}

const ROUTE_PROPERTY = {
  origin: ORIGIN_POINT,
  destination: DESTINY_POINT,
  travelMode: 'DRIVING', //WALKING, BICYCLING, TRANSIT
  provideRouteAlternatives: true,
};

function setMap() {
  var map = new google.maps.Map(MAP_DIV, MAP_PROPERTY);

  var marker = new google.maps.Marker({
    position: ORIGIN_POINT,
    map: map,
  });

  /* Show direction in map */
  DIRECTION_DISPLAY.setMap(map);

  /* Show panel direction in panel_div*/
  DIRECTION_DISPLAY.setPanel(PANEL_DIV);

  /* Request to directions service */
  DIRECTION_SERVICE.route(ROUTE_PROPERTY, (response, status) => {
    if (status === 'OK') {
      DIRECTION_DISPLAY.setDirections(response);
    }
  });
}

google.maps.event.addDomListener(window, 'load', setMap);