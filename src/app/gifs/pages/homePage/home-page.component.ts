import { Component, inject } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private gifsService = inject(GifService);

  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }
}
