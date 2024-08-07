const apiKey = "Enter your own API Key here"; //Enter you own API Key here from Open weather API
// FOR API KEY
// Go to the link-  https://home.openweathermap.org/api_keys
// Sign in
// find your api key

async function fetchWeatherData(city) {
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Unable to fetch weather data");
    }

    const data = await res.json();
    console.log(data);

    updateWeatherUI(data);
  } catch (error) {
    console.log(error);
  }
}

function updateWeatherUI(data) {
  let cityName = document.querySelector(".city");
  cityName.textContent = data.name;

  let temp = document.querySelector(".temp");
  temp.innerHTML = `<h1>${Math.floor(data.main.temp)}&deg;</h1>`;

  let windSpeed = document.querySelector(".wind-speed");
  windSpeed.textContent = `${data.wind.speed} KM/H`;

  let humidity = document.querySelector(".humidity");
  humidity.textContent = `${data.main.humidity}%`;

  let visibility = document.querySelector(".visibility-distance");
  visibility.textContent = `${data.visibility / 1000} KM/H`;

  let description = document.querySelector(".description-text");
  description.textContent = data.weather[0].description;

  let date = document.querySelector(".date");
  const currDate = new Date();
  date.textContent = currDate.toDateString();

  let descriptionIcon = document.querySelector(".description i");
  let weatherIconName = getWeatherIconName(data.weather[0].main);
  descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}

let formElement = document.querySelector(".search-form");
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputBox = document.querySelector(".city-input");
  let city = inputBox.value;
  if (city !== "") {
    fetchWeatherData(city);
    inputBox.value = "";
  }
});

function getWeatherIconName(weatherCondition) {
  const iconMap = {
    Clear: "wb_sunny",
    Clouds: "wb_cloudy",
    Rain: "umbrella",
    Thunderstorm: "flash_on",
    Drizzle: "grain",
    snow: "ac_unit",
    Mist: "cloud",
    Smoke: "cloud",
    Haze: "cloud",
    Fog: "cloud",
  };

  return iconMap[weatherCondition] || "help";
}
