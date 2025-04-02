// Weather API configuration
const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your actual API key
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

// DOM elements
const weatherIcon = document.querySelector("#navbar img") as HTMLImageElement;
const temperatureElement = document.querySelector(
  "#navbar p"
) as HTMLParagraphElement;

// // Get Location for weather
// let latitude: string | null = null;
// let longitude: string | null = null;

// const getLocation = (ev: Event) => {
//   const opts = {
//     enableHighAccuracy: true,
//     timeout: 1000 * 10,
//     maximumAge: 1000 * 60 * 5,
//   };

//   navigator.geolocation.getCurrentPosition(ftw, wtf, opts);
// };

// const ftw = async (position: GeolocationPosition) => {
//   latitude = position.coords.latitude.toFixed(2);
//   longitude = position.coords.longitude.toFixed(2);
//   const weatherData = await fetchWeatherData(latitude, longitude);
//   showWeather(weatherData);
// };

// const wtf = (err: GeolocationPositionError) => {
//   console.error("Geolocation Error", err);
//   temperatureElement.textContent = "Location denied";
// };

// Fetch current weather data
async function fetchWeatherData(lat: string, lon: string) {
  const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

// Simplified version of your showWeather function for the navbar
function showWeather(resp) {
  console.log(resp);

  // Update weather icon
  const iconCode = resp.weather[0].icon;
  weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
  weatherIcon.alt = resp.weather[0].description;

  // Update temperature (rounded to nearest whole number)
  const temperature = Math.round(resp.main.temp);
  temperatureElement.textContent = `${temperature}°C`;
}

// Initialize weather on page load
window.addEventListener("load", getLocation);

/////////////////
async function fetchWeatherData(lat: string, lon: string) {
  const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw error; // Re-throw the error if needed for further handling
  }
}
