import { Component, inject } from '@angular/core';
import { TileComponent } from './components/tile/tile.component';
import { ZoneComponent } from './components/zone/zone.component';
import { BoardStore } from './store/board-state.store';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [TileComponent, ZoneComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  protected readonly boardStore = inject(BoardStore);

}
