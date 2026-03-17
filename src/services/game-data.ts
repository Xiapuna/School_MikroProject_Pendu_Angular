import { inject, Injectable, signal } from '@angular/core';
import { HistoryEntry } from './history-entry';
import { GameDataSource } from './words-list-source';

@Injectable({
  providedIn: 'root',
})
export class GameData {
  // constructor(public gameDataSource: GameDataSource) {}

  test = inject(GameDataSource);

  readonly WORDS = this.test.buildWordsList();
  // readonly WORDS = ['CARROT', 'MAGIC', 'INSUFFERABLE'];
  readonly ERRORS_MAX = 5;
  record: number = 0;
  nb_errors = 0;
  history = signal<Array<HistoryEntry>>([]);

  incrementRecord(increment: number): void {
    this.record += increment;
  }

  addEntryToHistory(
    date: Date,
    word: String,
    lettersFound: Array<String>,
    nbErrors: Number,
    isWon: Boolean,
  ): void {
    let entry = {
      date: date,
      word: word,
      lettersFound: lettersFound,
      nbErrors: nbErrors,
      isWon: isWon,
    };
    this.history.update((oldHistory) => [...oldHistory, entry]);
  }
}
