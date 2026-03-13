import { Routes } from '@angular/router';
import { NotFound } from '../pages/not-found/not-found';
import { Game } from '../pages/game/game';
import { HangmanHistory } from '../pages/hangman-history/hangman-history';

export const routes: Routes = [
  {
    path: '',
    component: Game,
    title: 'Hangman',
  },
  {
    path: 'hangman-history',
    component: HangmanHistory,
    title: 'Hangman - Historique',
  },
  {
    path: '**',
    component: NotFound,
    title: 'Erreur 404',
  },
];
