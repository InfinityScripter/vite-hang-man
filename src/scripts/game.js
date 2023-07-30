import { WORDS } from "./CONSTS.JS";

const gameDiv = document.getElementById('game');

export const startGame = () => {
const randomIndex = Math.floor(Math.random() * WORDS.length);
const wordToGuess = WORDS[randomIndex]

sessionStorage.setItem("wordToGuess", wordToGuess);

// gameDiv.innerHTML = `<h1>${wordToGuess.length}</h1>`;

let placeholdersHTML = ''
for (let i = 0; i < wordToGuess.length; i++) {
    placeholdersHTML += `<h1 id="letter_${i}" class="letter"> _ </h1>`
};



console.log(wordToGuess);

gameDiv.innerHTML= `<div id='placeholders' class='placeholders-wrapper'>${placeholdersHTML}</div>`
}



