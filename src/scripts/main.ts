import '../styles/styles.css'
import { darkModeHandle } from './utils';
import { startGame } from './game';

darkModeHandle();

const startGameButton: HTMLElement | null = document.getElementById("StartGameButton");
if (startGameButton) {
   startGameButton.addEventListener('click', (): void => {
      startGame();
   })
}
