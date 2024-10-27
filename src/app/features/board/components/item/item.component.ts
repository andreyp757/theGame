import { Component, HostBinding, inject, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Item } from '../../models';
import { BoardStore } from '../../store/board-state.store';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RomanNumeralPipe } from '../../../../shared/pipes/roman-numeral.pipe';


@Component({
  selector: 'app-item',
  standalone: true,
  imports: [MatTooltipModule, MatMenuModule, MatIconModule, RomanNumeralPipe],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  host: {
    "(mouseenter)": "mergeAbility(item)",
    "(mouseleave)": "mergeAbility(null)"
  }
})
export class ItemComponent {

  protected readonly boardStore = inject(BoardStore);

  @Input() item!: Item;
  @Input() tileCoords!: { x: number, y: number };
  @HostBinding('class.is-focused')
  get isItemFocused() {
    return this.boardStore.mergeItems().includes(this.item.id);
  }

  mergeAbility(item: Item) {
    this.boardStore.processMerge(item, this.tileCoords);
  }

  mergeUpgrade() {
    this.boardStore.processMerge(this.item, this.tileCoords, true);
  }

  sellItem() {
    this.boardStore.sellItem(this.item);
  }

}
