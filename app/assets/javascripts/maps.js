mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpZ2F3aXJlIiwiYSI6ImNqYXo4YXRiNDFqMjEyd3Bpc2t5YXB2bHMifQ.ulCNsDwo7eL1R37bpRSxRg';

// var mapConfig = {
//   zoom: 0.1,
//   center: [0, 0]
// };

const maxZoom = 11;

$(document).on('turbolinks:load', () => {
  $('#map_title').on('input', function() {
    var value = $(this).val();
    $('#hipstermap-title').text(value);
  })

  $('#map_subtitle').on('input', function() {
    var value = $(this).val();
    $('#hipstermap-subtitle').text(value);
  })

  $('#map_coords').on('input', function() {
    var value = $(this).val();
    $('#hipstermap-coords').text(value);
  })

  if ($('#hipstermap-preview-map').length == 0) return;

  var map = new mapboxgl.Map({
      container: 'hipstermap-preview-map',
      style: 'mapbox://styles/shigawire/cjkqod0by7xsc2rpju6kvos0x',
      center: [0, 0],
      zoom: 0.1
  });

  map.scrollZoom.disable();

  map.on('zoomend', function(event) {
    var zoom = map.getZoom();
    zoom = Math.round(zoom) + 3
    $('#map_zoom').val(zoom);
  })

  map.on('moveend', function(event) {
    var center = map.getCenter();
    //var center = [centerPosition.lng, centerPosition.lat];
    $('#map_lon').val(center.lng);
    $('#map_lat').val(center.lat);

    var lat = center.lat.toString();
    var lng = center.lng.toString();
    var dms = convertDMS(lat, lng);
    $('#map_coords').val(dms);
    $('#hipstermap-coords').text(dms);
  })

  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    flyTo: false
    //zoom: 4
  });

  geocoder.on('result', function(data) {
    var center = data.result.center;
    var lng = center[0].toString();
    var lat = center[1].toString();
    var dms = convertDMS(lat, lng);
    $('#map_coords').val(dms);
    $('#hipstermap-coords').text(dms);

    var location = data.result.place_name.toUpperCase().split(', ')
    $('#map_title').val(location[0]);
    $('#hipstermap-title').text(location[0]);
    $('#map_subtitle').val(location[2]);
    $('#hipstermap-subtitle').text(location[2]);

    map.flyTo({
      center: data.result.center,
      zoom: maxZoom
    })
  });

  map.addControl(new mapboxgl.NavigationControl(), 'top-left');
  map.addControl(geocoder);

  // var map = L.mapbox.map('hipstermap-preview-map', 'shigawire.cjkqod0by7xsc2rpju6kvos0x')
  //     .setView([51.960, 7.617], 13);

})

function toDegreesMinutesAndSeconds(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return `${degrees}° ${minutes}' ${seconds}"`
}

function convertDMS(lat, lng) {
    var latitude = toDegreesMinutesAndSeconds(lat);
    var latitudeCardinal = lat >= 0 ? "N" : "S";

    var longitude = toDegreesMinutesAndSeconds(lng);
    var longitudeCardinal = lng >= 0 ? "E" : "W";

    return latitude + " " + latitudeCardinal + " - " + longitude + " " + longitudeCardinal;
}

//mapbox://styles/mapbox/light-v9
