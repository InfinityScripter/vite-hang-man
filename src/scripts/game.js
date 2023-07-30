import { WORDS, KEYBOARD_LETTERS } from "./CONSTS.JS";

const gameDiv = document.getElementById('game');

const createPlaceholdersHTML = () => {
    const wordToGuess = sessionStorage.getItem("wordToGuess");

//1. Create an array of letters from the wordToGuess using reduce method

const wordArray = Array.from(wordToGuess);

const placeholdersHTML = wordArray.reduce((acc, letter, i) => {
  acc += `<h1 id="letter_${i}" class="letter"> _ </h1>`;
  return acc;
}, "");


//2. Create an array of letters from the wordToGuess using repeat method



// const placeholdersHTML = Array.from('_'.repeat(wordToGuess.length)).reduce((acc, letter, i) => {
//     acc += `<h1 id="letter_${i}" class="letter"> _ </h1>`;
//     return acc;
//     }, "");

//3. Create an array of letters from the wordToGuess using for loop

//     let placeholdersHTML = ''
// for (let i = 0; i < wordToGuess.length; i++) {
//     placeholdersHTML += `<h1 id="letter_${i}" class="letter"> _ </h1>`
// };



console.log(wordToGuess);
return  `<div id='placeholders' class='placeholders-wrapper'>${placeholdersHTML}</div>`
}


const createKeyboardHTML = () => {
    const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, letter) => {
        acc += `<button class="keyboard-letter">${letter}</button>`;
        return acc;
    }, "");
    return `<div id='keyboard' class='keyboard-wrapper'>${keyboardHTML}</div>`
}

export const startGame = () => {
const randomIndex = Math.floor(Math.random() * WORDS.length);
const wordToGuess = WORDS[randomIndex]
sessionStorage.setItem("wordToGuess", wordToGuess);
gameDiv.innerHTML = createPlaceholdersHTML();
gameDiv.innerHTML += createKeyboardHTML();
}



console.log(KEYBOARD_LETTERS);


