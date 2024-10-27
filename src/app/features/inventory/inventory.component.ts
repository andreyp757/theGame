import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { InventoryStore } from './store/inventory-state.store';


@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {

  protected readonly inventoryStore = inject(InventoryStore);

}
