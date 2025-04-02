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
// Get Dad Joke API
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
        result.innerHTML = `${error}`;
    }
});
//Scores buttons
scoreButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const selectedButton = event.target;
        currentScore = parseInt(selectedButton.id);
    });
});
//Store in an array
button.addEventListener("click", () => {
    if (currentJoke) {
        reportJokes.push({
            joke: currentJoke,
            score: currentScore !== null && currentScore !== void 0 ? currentScore : 0,
            date: new Date().toISOString(),
        });
        console.log("Updated reportJokes:", reportJokes);
    }
    getDadJoke();
});
document.addEventListener("DOMContentLoaded", getDadJoke);
