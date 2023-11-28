const typeSelectEl = document.querySelector('#workout-type');
const runningUnitEl = document.querySelector('.cadence-box');
const cyclingUnitEl = document.querySelector('.elevation-box');

// initially set option to running and show its input
typeSelectEl.value = 1;

// Show/Hide Cadence/Elevation
const toggleUnitByType = () => {
  runningUnitEl.classList.toggle('hidden');
  cyclingUnitEl.classList.toggle('hidden');
};

// Event: On select change, show/Hide Cadence/Elevation
typeSelectEl.addEventListener('change', toggleUnitByType);
