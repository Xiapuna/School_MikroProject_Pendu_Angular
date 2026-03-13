import { Component, HostListener } from '@angular/core';
import { GameData } from '../../services/game-data';

@Component({
  selector: 'game',
  imports: [],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {
  constructor(public gameData: GameData) {}

  isGameOver = false;

  word = '';
  word_display: string[] = [];

  nb_letters = 0;
  nb_letters_found = 0;
  list_right_letters: string[] = [];
  list_wrong_letters: string[] = [];
  letters_played = '';

  game_over_message: string = '';

  hangman_pieces_visibility: string[] = ['hidden', 'hidden', 'hidden', 'hidden', 'hidden'];

  startNewGame(): void {
    // Hiding modal
    this.isGameOver = false;

    // Resetting hangman to hidden
    for (let i = 0; i < 5; i++) {
      this.setHangmanPieceVisibility(i, 'hidden');
    }

    // Resetting error counter
    this.gameData.nb_errors = 0;
    this.nb_letters_found = 0;

    // Resetting played letters
    this.letters_played = '';
    this.list_right_letters = [];
    this.list_wrong_letters = [];

    // Choosing new word
    let random_index = Math.floor(Math.random() * this.gameData.WORDS.length);
    this.word = this.gameData.WORDS[random_index];
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

    if (this.isLetter(letter)) {
      // check if letter already played
      if (!this.letters_played.includes(letter)) {
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
          this.gameData.nb_errors += 1;
          this.setHangmanPieceVisibility(this.gameData.nb_errors - 1, 'opacity-30');

          // Check if LOST
          if (this.gameData.nb_errors >= this.gameData.ERRORS_MAX) {
            this.showWord();
            // localStorage.setItem('record', 0);
            this.game_over_message = 'DEFAITE :(';
            this.isGameOver = true;
          }
        } else {
          // Check if WON
          if (this.nb_letters_found >= this.nb_letters) {
            this.gameData.incrementRecord(1);
            this.game_over_message = 'VICTOIRE ! :D';
            this.isGameOver = true;
          }
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

  isLetter(str: string): boolean {
    return /^[A-Z]$/.test(str);
  }
}
