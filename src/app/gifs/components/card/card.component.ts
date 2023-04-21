import { Component, Input } from '@angular/core';
import { Gif } from '../../gifs.interfaces';

@Component({
  selector: 'gifs-card',
  template: `
    <div>
      <div class="card mb-2 text-center bg-dark">
        <shared-lazy-image
          [url]="gif.images.downsized_medium.url"
          [alt]="gif.title || 'No name'"
        ></shared-lazy-image>
        <!-- <img
          [src]="gif.images.downsized_medium.url"
          [alt]="gif.title"
          class="card-img-top"
        /> -->
        <div class="card-body text-white text-center">
          <p class="card-text">{{ gif.title || 'No title' }}</p>
        </div>
      </div>
    </div>
  `,
})
export class CardComponent {
  @Input()
  public gif!: Gif;
}
