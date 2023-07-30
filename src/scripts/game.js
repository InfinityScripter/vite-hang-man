import { WORDS } from "./CONSTS.JS";

const gameDiv = document.getElementById('game');

export const startGame = () => {
const randomIndex = Math.floor(Math.random() * WORDS.length);
const wordToGuess = WORDS[randomIndex]

sessionStorage.setItem("wordToGuess", wordToGuess);

// gameDiv.innerHTML = `<h1>${wordToGuess.length}</h1>`;

let acc = ''
for (let i = 0; i < wordToGuess.length; i++) {
    acc = acc + ' _ '  
};
console.log(wordToGuess);
gameDiv.innerHTML = acc
}



