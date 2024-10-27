import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Obstacle } from '../../models';
import { BoardStore } from '../../store/board-state.store';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-obstacle',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './obstacle.component.html',
  styleUrls: ['./obstacle.component.scss'],
  host: {
    "(click)": "tryUnlock()"
  }
})
export class ObstacleComponent {

  protected readonly boardStore = inject(BoardStore);

  @Input() obstacle!: Obstacle;

  tryUnlock() {
    this.boardStore.removeObstacle(this.obstacle);
  }
}
