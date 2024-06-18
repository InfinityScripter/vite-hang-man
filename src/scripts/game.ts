import { KEYBOARD_LETTERS, WORDS } from "./consts";

const gameDiv = document.getElementById('game') as HTMLElement;
const logoH1 = document.getElementById('logo') as HTMLElement;
let livesLeft: number;
let winCount: number;
let incorrectGuesses: number = 0;
let currentCategory: string | null = null;

const quitButton: HTMLButtonElement = document.createElement('button');
quitButton.id = 'quitButton';
quitButton.className = 'quit-button';
quitButton.textContent = 'Quit';
quitButton.onclick = () => {
    if (confirm('Are you sure you want to quit?')) {
        stopGame('quit');
    }
};


const displayStats = (): void => {
    const stats = localStorage.getItem('stats');
    if (stats) {
        const statsObj = JSON.parse(stats);
        const { wins, losses } = statsObj;


        if (wins > 0 || losses > 0) {
            let statsDiv = document.getElementById('stats');
            if (!statsDiv) {
                statsDiv = document.createElement('div');
                statsDiv.id = 'stats';
                statsDiv.className = 'stats';
                gameDiv.insertBefore(statsDiv, gameDiv.firstChild);
            }
            statsDiv.innerHTML = `
<div class="flex flex-row gap-5">
                <p class="font-semibold text-emerald-500">wins: ${wins}</p>
                <p class=" font-semibold text-red-600">losses: ${losses}</p>
     </div>
            `;
        }
    }
};

// Создаем элементы для placeholders
const createPlaceholdersHTML = (): string => {
    const wordToGuess = sessionStorage.getItem("wordToGuess");
    if (!wordToGuess) {
        throw new Error("No word to guess found in session storage.");
    }

    const wordArray = Array.from(wordToGuess);

    const placeholdersHTML = wordArray.reduce((acc: string, letter: string, i: number) => {
        acc += `<h1 id="letter_${i}" class="letter"> _ </h1>`;
        return acc;
    }, "");

    return `<div id='placeholders' class='placeholders-wrapper'>${placeholdersHTML}</div>`
}

const createKeyboardHTML = (): HTMLElement => {
    const keyboard = document.createElement('div');
    keyboard.id = 'keyboard';
    keyboard.className = 'keyboard';
    const keyboardHTML = KEYBOARD_LETTERS.reduce((acc: string, letter: string) => {
        return acc += `<button id="${letter}" class="keyboard-button">${letter}</button>`;
    }, "");
    keyboard.innerHTML = keyboardHTML;
    return keyboard;
}

const createHangmanIMG = (): HTMLImageElement => {
    const hangmanIMG = document.createElement('img') as HTMLImageElement;
    hangmanIMG.id = 'hangmanIMG';
    hangmanIMG.alt = 'HangmanIMG';
    hangmanIMG.className = 'hangmanIMG';
    hangmanIMG.src = './img/hg-0.png';
    return hangmanIMG;
}

const checkLetter = (letter: string): void => {
    const wordToGuess = sessionStorage.getItem("wordToGuess");
    if (!wordToGuess) return;

    const inputLetter = letter.toLowerCase();
    if (!wordToGuess.includes(inputLetter)) {
        const livesCounter = document.getElementById('lives-left');
        if (!livesCounter) return;
        livesLeft -= 1;
        incorrectGuesses += 1;  
        livesCounter.innerText = livesLeft.toString();

        const hangmanIMG = document.getElementById('hangmanIMG') as HTMLImageElement;
        if (!hangmanIMG) return;
        hangmanIMG.src = `./img/hg-${10 - livesLeft}.png`;

        if (incorrectGuesses === 3 && currentCategory) {
            const hintDiv = document.createElement('div');
            hintDiv.id = 'hint';
            hintDiv.className = 'hint mt-5 font-semibold text-sm text-gray-500';
            hintDiv.innerText = `Hint: The category is ${currentCategory}`;
            gameDiv.insertBefore(hintDiv, gameDiv.firstChild);
        }

        if (livesLeft === 0) {
            stopGame('lose');
            updateUserStats('losses');
        }
    } else {
        const wordArray = Array.from(wordToGuess);
        wordArray.forEach((wordLetter, i) => {
            if (wordLetter === inputLetter) {
                winCount += 1;
                if (winCount === wordArray.length) {
                    stopGame('win');
                    updateUserStats('wins');
                    return;
                }
                const letterElement = document.getElementById(`letter_${i}`);
                if (letterElement) {
                    letterElement.innerText = inputLetter.toUpperCase();
                }
            }
        });
    }
}

const stopGame = (status: string): void => {
    const placeholders = document.getElementById('placeholders');
    const keyboard = document.getElementById('keyboard');
    const lives = document.getElementById('lives');
    const quitBtn = document.getElementById("quitButton");
    const hint = document.getElementById('hint');
    const statsDiv = document.getElementById('stats');

    placeholders?.remove();
    keyboard?.remove();
    lives?.remove();
    quitBtn?.remove();
    hint?.remove();
    statsDiv?.remove();

    let resultMessage: string;
    let resultImageSrc: string | undefined;

    if (status === 'win') {
        resultMessage = 'You won!';
        resultImageSrc = './img/hg-win.png';
    } else if (status === 'lose') {
        resultMessage = 'You lost!';
        resultImageSrc = './img/hg-10.png';
    } else {
        logoH1?.classList.remove('logo-sm');
        const hangmanIMG = document.getElementById('hangmanIMG') as HTMLImageElement;
        if (hangmanIMG) hangmanIMG.style.display = 'none';

        resultMessage = 'Do you want start again?';
    }

    const hangmanIMG = document.getElementById('hangmanIMG') as HTMLImageElement;
    if (hangmanIMG && typeof resultImageSrc === "string") {
        hangmanIMG.src = resultImageSrc;
    }

    if (status !== 'quit') {
        gameDiv.innerHTML += `
        <h3 class="result-word">The word was: ${sessionStorage.getItem("wordToGuess")}</h3>
    `;
    }
    gameDiv.innerHTML += `
        <h2 id="header" class="result-header ${status}">${resultMessage}</h2>
        <button id="restart" class="button-primary mt-5">Restart</button>
    `;

    const restartBtn = document.getElementById('restart');
    restartBtn?.addEventListener('click', () => {
        startGame();
    });

};

export const startGame = (): void => {
    logoH1?.classList.add('logo-sm');
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    const selectedWord = WORDS[randomIndex];
    const wordToGuess = selectedWord.word;
    currentCategory = selectedWord.category;
    livesLeft = 10;
    winCount = 0;
    incorrectGuesses = 0;
    sessionStorage.setItem("wordToGuess", wordToGuess);
    gameDiv.innerHTML = createPlaceholdersHTML();

    gameDiv.innerHTML += `<h2 class="font-semibold" id="lives">Lives:
<span 
class="lives-left"
id="lives-left">
${livesLeft}</span></h2>`;

    const keyboardDiv = createKeyboardHTML();
    gameDiv.appendChild(keyboardDiv);

    keyboardDiv.addEventListener("click", (e) => {
        const target = e.target as HTMLButtonElement;
        if (target.tagName.toLowerCase() === 'button') {
            target.disabled = true;
            checkLetter(target.id);
        }
    });

    const hangmanIMG = createHangmanIMG();
    gameDiv.prepend(hangmanIMG);

    gameDiv.insertAdjacentElement('afterend', quitButton);

    displayStats();
}

const updateUserStats = (result: 'wins' | 'losses'): void => {
    const stats = localStorage.getItem('stats');
    let statsObj = stats ? JSON.parse(stats) : { wins: 0, losses: 0 };
    statsObj[result] += 1;
    localStorage.setItem('stats', JSON.stringify(statsObj));
}
