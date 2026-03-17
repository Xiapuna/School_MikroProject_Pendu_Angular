import { Injectable, signal } from '@angular/core';
import { HistoryEntry } from './history-entry';

@Injectable({
  providedIn: 'root',
})
export class GameData {
  readonly WORDS = ['MAGIC', 'CARROT', 'INSUFFERABLE'];
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
    console.log(entry);
    console.log(this.history());
    this.history.update((oldHistory) => [...oldHistory, entry]);
    console.log(this.history());
  }
}
