let map;
const appState = [];
let workoutPosition;
const workoutForm = document.querySelector('.workout-form');
const workoutFormErr = document.querySelector('.form-error');
const inputDistance = document.getElementById('distance');

/////////////////////////////// General /////////////////////////////
const showForm = () => {
  workoutForm.classList.remove('hidden-form');

  setTimeout(() => {
    inputDistance.focus();
  }, 600);
};

const hideForm = () => {
  workoutForm.classList.add('hidden-form');
};

/////////////////////////// Toggle Candence/Elevation /////////////////
const toggleCadenceAndElevation = () => {
  const typeSelectEl = document.querySelector('#workout-type');
  const typeInputBoxes = document.querySelectorAll('.type-toggle');
  const typeInputs = document.querySelectorAll('.type-toggle input');
  const inputElevationEl = document.querySelector('.workout-elevation');

  // initially set option to running & disable elevation input
  typeSelectEl.value = 1;
  inputElevationEl.disabled = true;

  // Show/Hide Cadence/Elevation
  const toggleUnitByType = () => {
    typeInputBoxes.forEach((inputBox, i) => {
      // toggle hidden forEach inputBox
      inputBox.classList.toggle('hidden');

      // add/remove attribute 'disabled' to input
      // disabled input will not be part of FormData()
      if (inputBox.classList.contains('hidden')) typeInputs[i].disabled = true;
      else typeInputs[i].disabled = false;

      inputDistance.focus();
    });
  };

  // Event: On select change, show/Hide Cadence/Elevation
  typeSelectEl.addEventListener('change', toggleUnitByType);
};

/////////////////////////////////// Show Map ////////////////////////////

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

// Map click event
const onMapClick = e => {
  showForm();

  // store coords of clicked position
  workoutPosition = e.latlng;
};

/////////////////////////////////// FORM SUBMIT ///////////////////////
// Render marker
const renderMarker = (content, className, lat, lng) => {
  var marker = L.marker([lat, lng]).addTo(map);

  // popup options
  var options = {
    maxWidth: '500',
    closeOnClick: false,
    autoClose: false,
    className: className,
  };

  marker.bindPopup(content, options).openPopup();
};

// Render workouts
const renderWorkouts = workouts => {
  // Calculate speed
  const calcSpeed = (type, distance, time) => {
    if (type === 1) return (time / distance).toFixed(1);
    if (type === 2) return (distance / (time / 60)).toFixed(1);
  };

  const formatDate = date =>
    `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;

  const workoutContainer = document.querySelector('.workout-list');
  workoutContainer.textContent = '';

  workouts.forEach(workout => {
    let title = '';
    let popupTitle = '';
    let typeLogo = '';
    let speedUnit = '';
    let measure = '';
    let popupClass = '';

    switch (workout.type) {
      case 1:
        // Running
        typeLogo = `🏃🏾`;
        title = `Running on ${formatDate(new Date(workout.date))}`;
        popupTitle = `🏃🏾 ${title}`;
        speedUnit = `MIN/KM`;
        popupClass = `running-popup`;
        measure = `
        <span class="workout-icon">👣</span>
        <span class="workout-value">${workout.cadence}</span>
        <span class="workout-unit">SPM</span>`;
        break;
      case 2:
        // Cycling
        typeLogo = `🚴‍♀️`;
        title = `Cycling on ${formatDate(new Date(workout.date))}`;
        popupTitle = `🚴‍♀️ ${title}`;
        speedUnit = `KM/H`;
        popupClass = `cycling-popup`;
        measure = `
        <span class="workout-icon">⛰ </span>
        <span class="workout-value">${workout.elevation} </span>
        <span class="workout-unit">M</span>`;
        break;
    }

    let html = `
    <li class="workout workout-${workout.type}">
      <h2 class="workout-title">${title}</h2>
      <div class="workout-details-box">
        <div class="workout-details">
          <span class="workout-icon">${typeLogo}</span>
          <span class="workout-value">${workout.distance}</span>
          <span class="workout-unit">KM</span>
        </div>

        <div class="workout-details">
          <span class="workout-icon">⏱</span>
          <span class="workout-value">${workout.duration}</span>
          <span class="workout-unit">MIN</span>
        </div>

        <div class="workout-details">
          <span class="workout-icon">⚡️</span>
          <span class="workout-value">${calcSpeed(
            workout.type,
            workout.distance,
            workout.duration
          )}</span>
          <span class="workout-unit">${speedUnit}</span>
        </div>

        <div class="workout-details">
          ${measure}
        </div>
      </div>
    </li>`;

    workoutContainer.insertAdjacentHTML('afterbegin', html);

    renderMarker(popupTitle, popupClass, workout.lat, workout.lng);
  });
};

// Save state
const saveState = data => {
  const obj = {};
  for (const [key, value] of data) {
    obj[key] = key === 'date' ? value : +value.trim();
  }

  appState.push(obj);
  console.log(appState);
};

// All inputs must be positive numbers
const validateInputs = inputs => {
  console.log(inputs);
  for (const [key, value] of inputs) {
    // console.log(`${key}: ${value}\n`);
    const input = +value.trim();
    if (input == '' || input <= 0 || !isFinite(input)) return false;
  }

  return true;
};

const clearInputs = form => {
  const inputs = form.querySelectorAll('input');
  inputs.forEach(input => {
    input.value = '';
  });
};

// hide form error on click
workoutFormErr.addEventListener('click', function () {
  this.classList.add('hidden-err');
});

// On enter submit form
workoutForm.addEventListener('keyup', function (e) {
  // Key must be enter
  if (e.key !== 'Enter') return;

  // Get form data
  const formData = new FormData(this);
  // console.log(formData);

  // Validate
  // if not valid show alert
  if (!validateInputs(formData)) {
    workoutFormErr.classList.remove('hidden-err');
    return;
  }

  // Remove error message, if already shown
  if (!workoutFormErr.classList.contains('hidden-err'))
    workoutFormErr.classList.add('hidden-err');

  // Clear form input
  clearInputs(this);

  // Hide form
  hideForm();

  // Save state
  formData.append('lat', workoutPosition.lat);
  formData.append('lng', workoutPosition.lng);
  formData.append('date', new Date().toISOString());
  saveState(formData);

  // Render workouts
  renderWorkouts(appState);

  // Render marker
  // renderMarker(workoutPosition.lat, workoutPosition.lng);
});

//////////////////////////////// INIT //////////////////////////
const init = () => {
  toggleCadenceAndElevation();
  getUserPosition();
  clearInputs(workoutForm);
};

init();
