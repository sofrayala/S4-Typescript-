// Get Dad Joke API
let result = document.querySelector("#result") as HTMLElement;
let button = document.querySelector("#btn") as HTMLElement;
let scoreButtons = document.querySelectorAll(
  "#scores button"
) as NodeListOf<HTMLElement>;

let currentJoke: string = "";
let reportJokes: { joke: string; score: number | null; date: string }[] = [];
let currentScore: number | null = null;

const getDadJoke = async () => {
  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });

    const data = await response.json();
    currentJoke = data.joke;
    result.innerHTML = currentJoke;
    currentScore = null;
  } catch (error) {
    result.innerHTML = `${error}`;
  }
};

//Scores buttons
scoreButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const selectedButton = event.target as HTMLButtonElement;
    currentScore = parseInt(selectedButton.id);
  });
});

//Store in an array
button.addEventListener("click", () => {
  if (currentJoke) {
    reportJokes.push({
      joke: currentJoke,
      score: currentScore ?? 0,
      date: new Date().toISOString(),
    });

    console.log("Updated reportJokes:", reportJokes);
  }
  getDadJoke();
});

//Level 2

interface WeatherResponse {
  main: {
    temp: number;
  };
  weather: {
    icon: string;
  }[];
}

const API_KEY = "3fc40e59a7a8272313146bb441166295";
const LAT = 41.3851;
const LON = 2.1734;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const getCurrentWeather = async () => {
  const url = `${BASE_URL}?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: WeatherResponse = await response.json();
    const temperature = data.main.temp.toFixed(1);
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // HTML
    const temperatureHTML = document.getElementById("temperature");
    const iconHTML = document.getElementById(
      "weather-icon"
    ) as HTMLImageElement;

    if (temperatureHTML) temperatureHTML.textContent = `${temperature}°C`;
    if (iconHTML) iconHTML.src = iconUrl;
  } catch (error) {
    console.error("Failed to fetch weather:", error);
  }
};

getCurrentWeather();

document.addEventListener("DOMContentLoaded", getDadJoke);
