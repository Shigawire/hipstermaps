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
    //console.log(map.getZoom());
    var zoom = map.getZoom();
    $('#map_zoom').val(zoom);
  })

  map.on('moveend', function(event) {
    var centerPosition = map.getCenter();
    //var center = [centerPosition.lng, centerPosition.lat];
    $('#map_lon').val(centerPosition.lng);
    $('#map_lat').val(centerPosition.lat);
  })

  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    flyTo: false
    //zoom: 4
  });

  geocoder.on('result', function(data) {
    console.log(data.result.center);
    map.flyTo({
      center: data.result.center,
      zoom: maxZoom
    })
  });

  map.addControl(geocoder);

  // var map = L.mapbox.map('hipstermap-preview-map', 'shigawire.cjkqod0by7xsc2rpju6kvos0x')
  //     .setView([51.960, 7.617], 13);

})

//mapbox://styles/mapbox/light-v9
