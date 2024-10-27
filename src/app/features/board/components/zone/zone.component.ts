import { Component, HostBinding, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IZone } from '../../models';
import { BoardStore } from '../../store/board-state.store';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-zone',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
  host: {
    "(click)": "tryUnlock()",
    "(mouseenter)": "highlightZone(zone.id)",
    "(mouseleave)": "highlightZone(null)"
  }
})
export class ZoneComponent {

  protected readonly boardStore = inject(BoardStore);

  @Input() zone!: IZone;
  @HostBinding('class.is-focused')
  get isZoneFocused() {
    return this.boardStore.highlightedZone() === this.zone.id;
  }

  highlightZone(id: number | null) {
    this.boardStore.highlightZone(id);
  }

  tryUnlock() {
    this.boardStore.removeZone(this.zone);
  }

}
