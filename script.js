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
  let h1 = document.querySelector("city-name");
  let cityInput = document.querySelector("#cityname-input");
  if (cityInput.value) {
    h1.innerHTML = `${cityInput.value}`;
    searchCity(cityInput.value);
  }
}
function searchCity(city) {
  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}
let form = document.querySelector("form");
form.addEventListener("submit", showCity);

function showTemp(response) {
  let temperature = document.querySelector("#temperature-meaning");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.weather[0].main;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}
console.log(position);

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);

function changeToFahrenheit(celsius) {
  return celsius * 1.8 + 32;
}
changeToFahrenheit();

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", changeToFahrenheit);

function changeToCelsius(fahrenheit) {
  return (fahrenheit - 32) / 1.8;
}
changeToCelsius();

let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", changeToCelsius);

let currentTemperature = `${Math.round(response.data.main.temp)}`;
