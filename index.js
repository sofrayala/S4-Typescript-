"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let result = document.querySelector("#result");
let button = document.querySelector("#btn");
let scoreButtons = document.querySelectorAll("#scores button");
let currentJoke = "";
let reportJokes = [];
let currentScore = null;
const getDadJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://icanhazdadjoke.com/", {
            headers: { Accept: "application/json" },
        });
        const data = yield response.json();
        currentJoke = data.joke;
        result.innerHTML = currentJoke;
        currentScore = null;
    }
    catch (error) {
        result.innerHTML = `Dad joke error:${error}`;
    }
});
const getChuckJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://api.chucknorris.io/jokes/random");
        const data = yield response.json();
        currentJoke = data.value;
        result.innerHTML = currentJoke;
        currentScore = null;
    }
    catch (error) {
        result.innerHTML = `Chuck joke error:${error}`;
    }
});
const changeJokes = () => {
    const randomNum = Math.floor(Math.random() * 10);
    if (randomNum % 2 === 0) {
        getDadJoke();
    }
    else {
        getChuckJoke();
    }
};
scoreButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const selectedButton = event.target;
        currentScore = parseInt(selectedButton.id);
    });
});
button.addEventListener("click", () => {
    if (currentJoke) {
        reportJokes.push({
            joke: currentJoke,
            score: currentScore !== null && currentScore !== void 0 ? currentScore : 0,
            date: new Date().toISOString(),
        });
        console.log("Updated reportJokes:", reportJokes);
    }
    changeJokes();
});
const API_KEY = "3fc40e59a7a8272313146bb441166295";
const LAT = 41.3851;
const LON = 2.1734;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const getCurrentWeather = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${BASE_URL}?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;
    try {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error(`Error!: ${response.status}`);
        }
        const data = yield response.json();
        const temperature = data.main.temp.toFixed(1);
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        // HTML
        const temperatureHTML = document.getElementById("temperature");
        const iconHTML = document.getElementById("weather-icon");
        if (temperatureHTML)
            temperatureHTML.textContent = `${temperature}°C`;
        if (iconHTML)
            iconHTML.src = iconUrl;
    }
    catch (error) {
        console.error("Failed to fetch weather:", error);
    }
});
getCurrentWeather();
document.addEventListener("DOMContentLoaded", changeJokes);
