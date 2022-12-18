// function displayWeather(response) {
//   let weatherDiv = document.querySelector("#weather");
//   let temperature = Math.round(response.data.main.temp);
//   let description = response.data.weather[0].description;

//   weatherDiv.innerHTML = `It is ${temperature} degrees, ${description}, in ${response.data.name}`;
// }

// let city = city-input;

// axios.get(url).then(displayWeather);
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0".concat(hours);
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0".concat(minutes);
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return "".concat(day, " ").concat(hours, ":").concat(minutes);
}
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#discription").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "e2b9b76cb3bcb2d9cce084cc724f675b";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
    .concat(city, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "e2b9b76cb3bcb2d9cce084cc724f675b";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="
    .concat(position.coords.latitude, "&lon=")
    .concat(position.coords.longitude, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Bali");
