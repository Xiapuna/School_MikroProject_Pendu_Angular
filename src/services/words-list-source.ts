import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameDataSource {
  private readonly http = inject(HttpClient);
  protected wordsList: Array<String> = [];

  fetchAll(): Observable<[]> {
    let result = this.http.get<[]>(
      'https://random-words-api.kushcreates.com/api?language=fr&words=90',
    );
    return result;
  }

  buildWordsList(): Array<String> {
    // this._state.set('LOADING')

    this.fetchAll()
      .pipe(delay(1000))
      .subscribe({
        next: (words) => {
          for (let wordObject of words) {
            let word: String = wordObject['word'];
            this.wordsList.push(word.toUpperCase());
          }
          console.log(this.wordsList);
          console.log(this.wordsList[0]);
        },
      });
    return this.wordsList;
  }
}
