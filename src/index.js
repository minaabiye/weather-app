
let now = new Date();

let h3 = document.querySelector("#time");

let hour = now.getHours();
let minutes = now.getMinutes();

h3.innerHTML = `${hour}:${minutes}`;

let h2 = document.querySelector("#day");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h2.innerHTML = `${day}`;

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let userCity = document.querySelector("h1");
  userCity.innerHTML = cityInput.value;
}

let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", searchCity);





function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="card col">
          <div class="weather-forecast-temp">
            <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
            <img width="32" class="icon" src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"></img>
            <p>
              <span id="main-min">${Math.round(forecastDay.temp.min)}</span>°
              <strong> <span id="main-max">${Math.round(
                forecastDay.temp.max
              )}</span>° </strong>
            </p>
          </div>
        </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(event) {
  let apikey = "d3622e23c8936f0a71e3faa8f59251d0";
  let city = document.querySelector("#search-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
  axios.get(apiUrl).then(show);
}
function show(response) {
  let des = document.querySelector("#description");
  let temp = document.querySelector("#main-degree");
  let humidity = document.querySelector("#hum");
  let wind = document.querySelector("#wind");
  let minTemp = document.querySelector("#main-min");
  let maxTemp = document.querySelector("#main-max");
  let city = document.querySelector("h1");
  let icon = document.querySelector("#main-icon");
  temp.innerHTML = Math.round(response.data.main.temp);
  celsiusTemperature = response.data.main.temp;
  city.innerHTML = response.data.name;
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  des.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
 }

let form = document.querySelector("form");
form.addEventListener("submit", showTemperature);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiKey = "d3622e23c8936f0a71e3faa8f59251d0";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(show);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentPosition);

function currentLocation(event) {
  event.preventDefault();
  let getcurrentLocation = document.querySelector("#current-location");
  let userCity = document.querySelector("h1");
  userCity.innerHTML = getcurrentLocation.value;
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-degree");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#main-degree");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
