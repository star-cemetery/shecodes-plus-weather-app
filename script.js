let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();
let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let day = days[now.getDay()];
let date = now.getDate();
let year = now.getFullYear();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let currentDay = `${day}, ${month} ${date}, ${year}`;
let currentTime = `${hours} : ${minutes} : ${seconds}`;
let dayNow = document.querySelector("h3");
dayNow.innerHTML = currentDay;
let timeNow = document.querySelector("h4");
timeNow.innerHTML = currentTime;

let forecastElement = document.querySelector(".weather-forecast");
let forecastHTML = `<div class="row">`;
let forecastDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
forecastDays.forEach(function (forecastDay) {
  forecastHTML =
    forecastHTML +
    `<div class="col-2">
          <h2>${forecastDay}</h2>
          <br />
          <img src id="icon" width="80" />
          <br />
          <span id="temp-value">7 °C</span>
        </div>`;
});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "3ef72t8co306b30ebbc9c4af95efb4e4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}
function displayForecast(response) {
  console.log(response.data.daily[0].condition);
}

function showTemp(response) {
  let temperature = document.querySelector("#temperature-value");
  temperature.innerHTML = `${Math.round(response.data.temperature.current)}`;
  celsiusTemperature = response.data.temperature.current;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.city;
  let weatherDescription = document.querySelector("#weather-descr");
  weatherDescription.innerHTML = response.data.condition.description;
  let wind = document.querySelector("#wind-value");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  let humidity = document.querySelector("#humidity-value");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  let feelsLike = document.querySelector("#feels-like-value");
  feelsLike.innerHTML = `${Math.round(response.data.temperature.feels_like)}`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.description);
  getForecast(response.data.coordinates);

  showForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "3ef72t8co306b30ebbc9c4af95efb4e4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function showCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("#city-name");
  let cityInput = document.querySelector("#cityname-input");
  if (cityInput.value) {
    h1.innerHTML = `${cityInput.value}`;
  } else {
    alert("Nowhere has no data about it...");
  }
  searchCity(cityInput.value);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3ef72t8co306b30ebbc9c4af95efb4e4";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-value");
  fahrenheitButton.classList.add("active");
  celsiusButton.classList.remove("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function changeToCelsius(event) {
  event.preventDefault();
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", changeToFahrenheit);

let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", changeToCelsius);

let form = document.querySelector("form");
form.addEventListener("submit", showCity);

searchCity("Reykjavik");
