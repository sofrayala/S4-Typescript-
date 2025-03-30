// //Ej 1

let result = document.querySelector("#result") as HTMLHtmlElement;
let button = document.querySelector("#btn") as HTMLElement;
let currentJoke: string = "";

const getDadJoke = async () => {
  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });

    const data = await response.json();
    result.innerHTML = data.joke;

    return currentJoke;
  } catch (error) {
    result.innerHTML = `${error}`;
  }
};

// button.addEventListener("click", getDadJoke);
// document.addEventListener("DOMContentLoaded", getDadJoke);

//Ej2
