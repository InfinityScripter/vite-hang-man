import '../styles/styles.css'
import { darkModeHandle } from './utils';
import { startGame } from './game';

darkModeHandle();

const startGameButton = document.getElementById("StartGameButton");
startGameButton.addEventListener('click', () => {
   startGame();
})