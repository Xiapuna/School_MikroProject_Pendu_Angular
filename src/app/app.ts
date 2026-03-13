import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameData } from '../services/game-data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(public gameData: GameData) {}

  protected readonly title = signal('Pendu_Angular');

  // localStorage.setItem("record", 0)

  // -------------------------------------------------------------------------------------------
  // FUNCTIONS
  // -------------------------------------------------------------------------------------------

  // let old_value = parseInt(localStorage.getItem('record'));
  // let new_value = old_value + increment;
  // localStorage.setItem('record', new_value);

  // showRecord() {
  //   RECORD.textContent = localStorage.getItem('record');
  // }
}
