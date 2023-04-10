'use strict';

const overlay = document.querySelector('.overlay');
const loading = document.querySelector('.loading');

mapboxgl.accessToken = 'pk.eyJ1IjoicnVzaGl0cCIsImEiOiJjbGc5b2Y2eGcwbGpvM25vd2ZtcDdyZWppIn0.wRDJGN15s7fph_CLElJiRg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [0, 0],
  pitch: 40,
  zoom: 16
});

const marker = new mapboxgl.Marker({
  color: '#3898ff'
});
  

function getLocation(position) {
  const { longitude, latitude } = position.coords;

  if (longitude && latitude) {
    map.setCenter([longitude, latitude]);
    marker.setLngLat([longitude, latitude]).addTo(map);
    setTimeout(() => { overlay.style.display = 'none'}, 500);
  }
}

function errorHandler(event) {
  loading.style.animationPlayState = 'paused';
  console.log(event.message);
}

const options = {
  enableHighAccuracy: true,
  maximumAge: 0
}

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(getLocation, errorHandler, options);
} else {
  console.log('Geolocation is not supported by your browser');
}