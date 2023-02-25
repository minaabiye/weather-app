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

function convertCelsius() {
  let mainDegree = document.querySelector("#main-degree");
  mainDegree.innerHTML = "3°C";
}

function convertFahrenheit() {
  let mainDegree = document.querySelector("#main-degree");
  mainDegree.innerHTML = "37°F";
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
  let temperature = Math.round(response.data.main.temp);
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  temp.innerHTML = temperature;
  des.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
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
