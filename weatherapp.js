document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const WeatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "95938ffc0bacf13cc9cc30f4f777a58d";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);
    if (!response.ok) {
      throw new Error("city not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature:${main.temp}`;
    description.textContent = `weather:${weather[0].description}`;
    WeatherInfo.classList.remove("hidden");
    errorMessage.class.add("hidden");
  }
  function showError() {
    WeatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
});
