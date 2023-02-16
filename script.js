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

function showCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("#city-name");
  let cityInput = document.querySelector("#cityname-input");
  if (cityInput.value) {
    h1.innerHTML = `${cityInput.value}`;
    searchCity(cityInput.value);
  }
}
function searchCity(city) {
  let apiKey = "236afc988cb00486bd73ff9950b47b26";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}
let form = document.querySelector("form");
form.addEventListener("submit", showCity);

function showTemp(response) {
  console.log(response.data.main);
  let temperature = document.querySelector("#temperature-value");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
  let weatherDescription = document.querySelector("#weather-descr");
  weatherDescription.innerHTML = response.data.weather[0].main;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;
  let feelsLike = document.querySelector("#feels-like-value");
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "236afc988cb00486bd73ff9950b47b26";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

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
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
  let fahrenheitTemperature = currentTemperature * 1.8 + 32;
  let temperatureElement = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", changeToFahrenheit);

function changeToCelsius(event) {
  event.preventDefault();
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
  let celsiusTemperature = document.querySelector("#temperature-value");
  celsiusTemperature.innerHTML = Math.round(currentTemperature);
}

let currentTemperature = null;
let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", changeToCelsius);
