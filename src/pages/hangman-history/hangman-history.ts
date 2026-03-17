import { Component, computed } from '@angular/core';
import { GameData } from '../../services/game-data';

@Component({
  selector: 'hangman-history',
  imports: [],
  templateUrl: './hangman-history.html',
  styleUrl: './hangman-history.css',
})
export class HangmanHistory {
  constructor(public gameData: GameData) {}

  public historyToPrint = computed(() => {
    return this.gameData.history();
  });
}
