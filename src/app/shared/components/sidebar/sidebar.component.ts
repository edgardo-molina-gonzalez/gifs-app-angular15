import { Component } from '@angular/core';
import { GifService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private gifsService: GifService) {}

  get tagHistory() {
    return this.gifsService.tagsHistory;
  }

  // busca los gif usando como argumento los items de la lista del boton
  searchGifs(tag: string) {
    this.gifsService.searchTag(tag);
  }
}
