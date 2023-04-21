import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Gif, SearchResponse } from '../gifs.interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  // lista de gifs en pantalla
  public gifList: Gif[] = [];

  // lista del sidebar
  private _tagsHistory: string[] = [];
  private apiKey: string = `KfsGKkIC96htLp21iBSyJoPU28CTXPFD`;
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';

  get tagsHistory() {
    return this._tagsHistory;
  }

  constructor() {
    this.loadLocalStorage();
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 9);
    this.saveLocalStorage();
  }

  // guarda la lista en el localStorage
  // JSON.stringify pasa un objeto o array a string para ser guardado en localstorage
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  // recoge la información de localStorage y la conserva en la pantalla de la lista
  // JSON.parse agarra el string guardado por JSON.stringify y lo convierte en objeto
  // !siempre se llama en el constructor
  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    // validación para mantener persistente los gifs en pantalla
    if (this._tagsHistory.length === 0) return;
    // searchTag() recibiendo como parámetro el índice de la lista
    this.searchTag(this._tagsHistory[0]);
  }

  // !con httpClient
  searchTag(tag: string) {
    if (tag.length <= 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', 50);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((gifs) => {
        this.gifList = gifs.data;
      });
  }
  // !con promesa
  // async searchTag(tag: string): Pomise<void> {
  //   if (tag.length <= 0) return;
  //   this.organizeHistory(tag);
  //   fetch(
  //     `http://api.giphy.com/v1/gifs/search?api_key=KfsGKkIC96htLp21iBSyJoPU28CTXPFD&q=megaman&limit=10`
  //   )
  //     .then((resp) => resp.json())
  //     .then((data) => console.log(data));
  // }

  // !con async await
  // async searchTag(tag: string): Pomise<void> {
  //   if (tag.length <= 0) return;
  //   this.organizeHistory(tag);
  //   const resp = await fetch(
  //     `http://api.giphy.com/v1/gifs/search?api_key=KfsGKkIC96htLp21iBSyJoPU28CTXPFD&q=megaman&limit=10`
  //   );
  //   const data = await resp.json();
  //   console.log(data);
  // }
}
