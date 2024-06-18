import { WORDS, KEYBOARD_LETTERS } from "./CONSTS.JS";

const gameDiv = document.getElementById('game');
const logoH1 = document.getElementById('logo');

const createPlaceholdersHTML = () => {
    const wordToGuess = sessionStorage.getItem("wordToGuess");


const wordArray = Array.from(wordToGuess);

const placeholdersHTML = wordArray.reduce((acc, letter, i) => {
  acc += `<h1 id="letter_${i}" class="letter"> _ </h1>`;
  return acc;
}, "");



return  `<div id='placeholders' class='placeholders-wrapper'>${placeholdersHTML}</div>`
}


const createKeyboardHTML = () => {
const keyboard = document.createElement('div');
keyboard.id = 'keyboard';
keyboard.className = 'keyboard';
const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, letter) => {
  return  acc += `<button id="${letter}" class="keyboard-button">${letter}</button>`;

}
, "");
keyboard.innerHTML = keyboardHTML;
return keyboard;}

const createHangmanIMG = () => {
const hangmanIMG = document.createElement('img');
hangmanIMG.id = 'hangmanIMG';
hangmanIMG.alt = 'HangmanIMG';
hangmanIMG.className = 'hangmanIMG';
hangmanIMG.src = './img/hg-0.png';
return hangmanIMG;
}

export const startGame = () => {
logoH1.classList.add('logo-sm');
const randomIndex = Math.floor(Math.random() * WORDS.length);
const wordToGuess = WORDS[randomIndex]
sessionStorage.setItem("wordToGuess", wordToGuess);
gameDiv.innerHTML = createPlaceholdersHTML();

gameDiv.innerHTML += `<h2 id="lives">Lives:
<span 
class="lives-left"
id="lives-left">
${wordToGuess.length}</span></h2>`;


const keyboardDiv = createKeyboardHTML();
gameDiv.appendChild(keyboardDiv);

keyboardDiv.addEventListener("click", (e) => {
console.log(e.target.id,'event');
    console.log(event.target, 'event.target');
})

const hangmanIMG = createHangmanIMG();
gameDiv.prepend(hangmanIMG);
}







