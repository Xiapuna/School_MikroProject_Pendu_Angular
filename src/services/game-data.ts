import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameData {
  readonly WORDS = ['MAGIC', 'CARROT', 'INSUFFERABLE'];
  readonly ERRORS_MAX = 5;
  record: number = 0;
  nb_errors = 0;

  incrementRecord(increment: number): void {
    this.record += increment;
  }
}
