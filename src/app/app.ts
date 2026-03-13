import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '../../node_modules/@angular/common/types/_common_module-chunk';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Pendu_Angular');

  readonly WORDS = ['MAGIC', 'CARROT', 'INSUFFERABLE'];
  readonly ERRORS_MAX = 5;

  isGameOver = false;

  word = '';
  word_display: string[] = [];
  nb_errors = 0;
  nb_letters = 0;
  nb_letters_found = 0;
  list_right_letters: string[] = [];
  list_wrong_letters: string[] = [];
  letters_played = '';
  record: number = 0;
  game_over_message: string = '';

  hangman_pieces_visibility: string[] = ['hidden', 'hidden', 'hidden', 'hidden', 'hidden'];
  // localStorage.setItem("record", 0)

  // -------------------------------------------------------------------------------------------
  // FUNCTIONS
  // -------------------------------------------------------------------------------------------

  startNewGame(): void {
    // Hiding modal
    this.isGameOver = false;

    // Resetting hangman to hidden
    for (let i = 0; i < 5; i++) {
      this.setHangmanPieceVisibility(i, 'hidden');
    }

    // Resetting error counter
    this.nb_errors = 0;
    this.nb_letters_found = 0;

    // Resetting played letters
    this.letters_played = '';
    this.list_right_letters = [];
    this.list_wrong_letters = [];

    // Choosing new word
    let random_index = Math.floor(Math.random() * this.WORDS.length);
    this.word = this.WORDS[random_index];
    this.nb_letters = this.word.length;

    // Resetting board
    this.word_display = [];
    for (let i = 1; i <= this.nb_letters; i++) {
      this.word_display.push('');
    }
  }

  @HostListener('document:keydown', ['$event'])
  getPlayerInput(event: KeyboardEvent): void {
    if (this.isGameOver) return;
    console.log('input detected');

    let letter = event.key.toUpperCase();

    // check if letter already played
    if (!this.letters_played.includes(letter) && this.isLetter(letter)) {
      // Check if letter in word
      let is_letter_found = false;
      for (let i = 0; i < this.nb_letters; i++) {
        if (letter == this.word[i] && this.word_display[i] == '') {
          // Add letter to right letters
          if (!is_letter_found) {
            this.list_right_letters.push(letter);
            is_letter_found = true;
          }
          this.word_display[i] = letter;
          this.nb_letters_found += 1;
        }
      }

      this.letters_played = this.letters_played + letter;

      if (!is_letter_found) {
        // Add letter to wrong letters
        this.list_wrong_letters.push(letter);
        this.nb_errors += 1;
        this.setHangmanPieceVisibility(this.nb_errors - 1, 'opacity-30');

        // Check if LOST
        if (this.nb_errors >= this.ERRORS_MAX) {
          this.showWord();
          // localStorage.setItem('record', 0);
          this.game_over_message = 'DEFAITE :(';
          this.isGameOver = true;
        }
      } else {
        // Check if WON
        if (this.nb_letters_found >= this.nb_letters) {
          this.incrementRecord(1);
          this.game_over_message = 'VICTOIRE ! :D';
          this.isGameOver = true;
        }
      }
    }
  }

  showWord(): void {
    for (let i = 0; i < this.nb_letters; i++) {
      this.word_display[i] = this.word[i];
    }
  }

  setHangmanPieceVisibility(id_piece: number, visibility: string): void {
    this.hangman_pieces_visibility[id_piece] = visibility;
  }

  incrementRecord(increment: number): void {
    this.record += increment;
    // let old_value = parseInt(localStorage.getItem('record'));
    // let new_value = old_value + increment;
    // localStorage.setItem('record', new_value);
  }

  // showRecord() {
  //   RECORD.textContent = localStorage.getItem('record');
  // }

  isLetter(str: string): boolean {
    return str.match(/[a-z]/i) !== null;
  }
}
