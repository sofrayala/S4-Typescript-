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
});

document.addEventListener("DOMContentLoaded", getDadJoke);
