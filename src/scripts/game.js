import {KEYBOARD_LETTERS, WORDS} from "./CONSTS.JS";

const gameDiv = document.getElementById('game');
const logoH1 = document.getElementById('logo');
let livesLeft;
let winCount;
const quitButton = document.createElement('button');
quitButton.id = 'quitButton';
quitButton.className = 'quit-button';
quitButton.textContent = 'Quit';
quitButton.onclick = () => {
    confirm('Are you sure you want to quit?')
        ? stopGame('quit')
        : null;
};

const createPlaceholdersHTML = () => {
    const wordToGuess = sessionStorage.getItem("wordToGuess");


    const wordArray = Array.from(wordToGuess);

    const placeholdersHTML = wordArray.reduce((acc, letter, i) => {
        acc += `<h1 id="letter_${i}" class="letter"> _ </h1>`;
        return acc;
    }, "");


    return `<div id='placeholders' class='placeholders-wrapper'>${placeholdersHTML}</div>`
}


const createKeyboardHTML = () => {
    const keyboard = document.createElement('div');
    keyboard.id = 'keyboard';
    keyboard.className = 'keyboard';
    const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, letter) => {
            return acc += `<button id="${letter}" class="keyboard-button">${letter}</button>`;

        }
        , "");
    keyboard.innerHTML = keyboardHTML;
    return keyboard;
}

const createHangmanIMG = () => {
    const hangmanIMG = document.createElement('img');
    hangmanIMG.id = 'hangmanIMG';
    hangmanIMG.alt = 'HangmanIMG';
    hangmanIMG.className = 'hangmanIMG';
    hangmanIMG.src = './img/hg-0.png';
    return hangmanIMG;
}

const checkLetter = (letter) => {
    const wordToGuess = sessionStorage.getItem("wordToGuess");
    const inputLetter = letter.toLowerCase();
    if (!wordToGuess.includes(inputLetter)) {
        const livesCounter = document.getElementById('lives-left');
        livesLeft -= 1;
        livesCounter.innerText = livesLeft

        const hangmanIMG = document.getElementById('hangmanIMG');
        hangmanIMG.src = `./img/hg-${10 - livesLeft}.png`;

        if (livesLeft === 0) {
            stopGame('lose');
        }
    } else {
        const wordArray = Array.from(wordToGuess);
        wordArray.forEach((wordLetter, i) => {
            if (wordLetter === inputLetter) {
                winCount += 1;
                if (winCount === wordArray.length) {
                    stopGame('win');
                    return;
                }
                const letterElement = document.getElementById(`letter_${i}`);
                letterElement.innerText = inputLetter.toUpperCase();
            }
        });

    }

}

const stopGame = (status) => {
    document.getElementById('placeholders').remove();
    document.getElementById('keyboard').remove();
    document.getElementById('lives').remove();
    document.getElementById("quitButton").remove();


    let resultMessage
    let resultImageSrc

    if (status === 'win') {
        resultMessage = 'You won!';
        resultImageSrc = './img/hg-win.png';
    }
    if (status === 'lose') {
        resultMessage = 'You lost!';
        resultImageSrc = './img/hg-10.png';
    }
    if (status === 'quit') {
        logoH1.classList.remove('logo-sm');
        document.getElementById('hangmanIMG').style.display = 'none';

        resultMessage = 'Do you want start again?';

    }

    const hangmanIMG = document.getElementById('hangmanIMG');
    hangmanIMG.src = resultImageSrc;
    if (status !== 'quit') {
        gameDiv.innerHTML += `
        <h3 class="result-word">The word was: ${sessionStorage.getItem("wordToGuess")}</h3>
        
    `;
    }
    gameDiv.innerHTML += `
        <h2 id="header" class="result-header ${status}">${resultMessage}</h2>
        <button id="restart" class="button-primary mt-5">Restart</button>
    `;

    document.getElementById('restart').addEventListener('click', () => {
        startGame();
    });
};

export const startGame = () => {
    logoH1.classList.add('logo-sm');
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    const wordToGuess = WORDS[randomIndex]
    livesLeft = 10
    winCount = 0;
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
        if (e.target.tagName.toLowerCase() === 'button') {
            e.target.disabled = true;
            checkLetter(e.target.id)
        }
    })

    const hangmanIMG = createHangmanIMG();
    gameDiv.prepend(hangmanIMG);

    gameDiv.insertAdjacentElement('afterend', quitButton);
}







