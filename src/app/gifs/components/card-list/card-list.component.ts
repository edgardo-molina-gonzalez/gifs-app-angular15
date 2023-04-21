import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../gifs.interfaces';

@Component({
  selector: 'gif-card-list',
  template: `
    <div class="row">
      <gifs-card
        *ngFor="let gif of gifs"
        [gif]="gif"
        class="col-md-3 col-sm-6"
      ></gifs-card>
    </div>
  `,
  styles: [
    `
      li {
        list-style: none;
      }
    `,
  ],
})
export class CardListComponent implements OnInit {
  @Input()
  public gifs: Gif[] = [];

  ngOnInit() {
    if (!this.gifs) throw new Error('Gif property is required');
  }
}
