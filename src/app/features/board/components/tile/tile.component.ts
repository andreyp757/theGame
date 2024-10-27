import { Component, Input } from '@angular/core';
import { FactoryComponent } from '../factory/factory.component';
import { ObstacleComponent } from '../obstacle/obstacle.component';
import { ITile } from '../../models';
import { ZoneComponent } from '../zone/zone.component';
import { ItemComponent } from '../item/item.component';


@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [FactoryComponent, ObstacleComponent, ZoneComponent, ItemComponent],
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {

  @Input() tile!: ITile;

}
