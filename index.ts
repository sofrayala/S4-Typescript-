import "dotenv/config";

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
    result.innerHTML = `Dad joke error:${error}`;
  }
};

const getChuckJoke = async () => {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");

    const data = await response.json();
    currentJoke = data.value;
    result.innerHTML = currentJoke;
    currentScore = null;
  } catch (error) {
    result.innerHTML = `Chuck joke error:${error}`;
  }
};

const changeJokes = () => {
  const randomNum = Math.floor(Math.random() * 10);
  if (randomNum % 2 === 0) {
    getDadJoke();
  } else {
    getChuckJoke();
  }
};

scoreButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const selectedButton = event.target as HTMLButtonElement;
    currentScore = parseInt(selectedButton.id);
  });
});

button.addEventListener("click", () => {
  if (currentJoke) {
    reportJokes.push({
      joke: currentJoke,
      score: currentScore ?? 0,
      date: new Date().toISOString(),
    });

    console.log("Updated reportJokes:", reportJokes);
  }
  changeJokes();
});

//Weather
interface WeatherResponse {
  main: {
    temp: number;
  };
  weather: {
    icon: string;
  }[];
}
const API_KEY: string = process.env.API_KEY || "";
const LAT: number = 41.3851;
const LON: number = 2.1734;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const getCurrentWeather = async () => {
  const url = `${BASE_URL}?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error!: ${response.status}`);
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

document.addEventListener("DOMContentLoaded", changeJokes);
