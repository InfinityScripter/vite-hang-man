import { WORDS } from "./CONSTS.JS";

const gameDiv = document.getElementById('game');

const createPlaceholdersHTML = () => {
    const wordToGuess = sessionStorage.getItem("wordToGuess");

//1. Create an array of letters from the wordToGuess

const wordArray = Array.from(wordToGuess);

const placeholdersHTML = wordArray.reduce((acc, letter, i) => {
  acc += `<h1 id="letter_${i}" class="letter"> _ </h1>`;
  return acc;
}, "");



//     let placeholdersHTML = ''
// for (let i = 0; i < wordToGuess.length; i++) {
//     placeholdersHTML += `<h1 id="letter_${i}" class="letter"> _ </h1>`
// };



console.log(wordToGuess);
return  `<div id='placeholders' class='placeholders-wrapper'>${placeholdersHTML}</div>`
}


export const startGame = () => {
const randomIndex = Math.floor(Math.random() * WORDS.length);
const wordToGuess = WORDS[randomIndex]
sessionStorage.setItem("wordToGuess", wordToGuess);
gameDiv.innerHTML = createPlaceholdersHTML();
}









