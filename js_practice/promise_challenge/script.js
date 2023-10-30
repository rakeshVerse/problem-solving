/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data.
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

*/

const countryContainer = document.querySelector('.countries');
const btn = document.querySelector('button');
const loader = document.querySelector('.load');
const errContainer = document.getElementById('err');
const posContainer = document.getElementById('pos');

const renderErr = msg => (errContainer.textContent = `Error: ${msg}`);

const renderMsg = msg => (posContainer.textContent = msg);

const renderCountry = (country, className = '') => {
  const { name, currencies, languages, flags, region, population } = country;
  const nativeNames = Object.values(name.nativeName);
  const { common: nativeName } =
    nativeNames.length > 1 ? nativeNames[1] : nativeNames[0];
  const langs = Object.values(languages).join(', ');
  const { name: curr, symbol: symbol } = Object.values(currencies)[0];

  const html = `<article class="country ${className}">
          <img class="country__img" src="${flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${name.common} (${nativeName})</h3>
            <h4 class="country__region">${region}</h4>
            <p class="country__row"><span>👫</span>${(
              +population / 1000000
            ).toFixed(2)}M people</p>
            <p class="country__row"><span>🗣️</span>${langs}</p>
            <p class="country__row"><span>💰</span>${curr} (${symbol})</p>
          </div>
        </article>`;
  countryContainer.insertAdjacentHTML('beforeend', html);
};

const getAPIJson = (url, err) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error(err);
    return res.json();
  });

const whereAmI = function (lat, lng) {
  getAPIJson(
    `https://geocode.xyz/${lat},${lng}?geoit=json`,
    `Server responded with failure!`
  )
    .then(res => {
      const { city, country } = res;
      if (city.startsWith('Throttle'))
        throw new Error(`Only 3 requests/sec are allowed! :(`);

      renderMsg(`You are in ${city}, ${country}`);
      return getAPIJson(
        `https://restcountries.com/v3.1/name/${country}`,
        `Couldn't find the country you're looking for!`
      );
    })
    .then(res => {
      renderCountry(res[0]);
      const borders = res[0].borders;

      if (!borders)
        throw new Error(
          `${res[0].name.common} doesn't share borders with any country.`
        );
      return getAPIJson(
        `https://restcountries.com/v3.1/alpha?codes=${res[0].borders.join(
          ','
        )}`,
        `Server responded with failure!`
      );
    })
    .then(neighbours =>
      neighbours.forEach(neighbour => renderCountry(neighbour, 'neighbour'))
    )
    .catch(err => renderErr(err.message))
    .finally(() => {
      countryContainer.style.opacity = 1;
      loader.style.opacity = 0;
    });
};

btn.addEventListener('click', function () {
  loader.style.opacity = 1;
  countryContainer.textContent = '';
  errContainer.textContent = '';
  posContainer.textContent = '';

  // whereAmI(52.508, 13.381);
  whereAmI(19.037, 72.873);
  // whereAmI(-33.933, 18.474);
});
