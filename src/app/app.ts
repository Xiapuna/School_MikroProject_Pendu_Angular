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
}
