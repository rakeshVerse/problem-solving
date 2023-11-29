let map;
/////////////////////////// Toggle Candence/Elevation /////////////////
const toggleCadenceAndElevation = () => {
  const typeSelectEl = document.querySelector('#workout-type');
  const runningUnitEl = document.querySelector('.cadence-box');
  const cyclingUnitEl = document.querySelector('.elevation-box');

  // initially set option to running
  typeSelectEl.value = 1;

  // Show/Hide Cadence/Elevation
  const toggleUnitByType = () => {
    runningUnitEl.classList.toggle('hidden');
    cyclingUnitEl.classList.toggle('hidden');
  };

  // Event: On select change, show/Hide Cadence/Elevation
  typeSelectEl.addEventListener('change', toggleUnitByType);
};
/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////// Show Map ///////////////////////////////////

// LEAFLET: Load Map
const loadMap = (lat, lng) => {
  map = L.map('map').setView([lat, lng], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // Map click event
  map.on('click', onMapClick);
};

// GEOLOACTION API: Get user's position
const getUserPosition = () => {
  // On success
  const success = position => {
    const { latitude, longitude } = position.coords;

    // load map for user's coords
    loadMap(latitude, longitude);
  };

  // On error
  const error = () => {
    console.log(`Couldn't get your location!`);

    // load map using london coords
    loadMap(51.505, -0.09);
  };

  /* geolocation is available  or not*/
  if ('geolocation' in navigator) {
    // get user's position
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    error();
  }
};
/////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////// MAP CLICK ////////////////////////////////
const onMapClick = e => {
  console.log(e);
  // Show form
  const workoutForm = document.querySelector('.workout-form');
  workoutForm.classList.toggle('hidden-form');
  // console.log('You clicked the map at ' + e.latlng);
};

////////////////////////////////////// INIT ///////////////////////////////////////////
const init = () => {
  toggleCadenceAndElevation();
  getUserPosition();
};

init();
