import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Factory } from '../../models';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-factory',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss']
})
export class FactoryComponent {

  @Input() factory!: Factory;

}
