import { Item } from './item.model';

export interface IOrder {
  requirements: { item: Item; quantity: number }[];
  producedItem: Item;
}

export class Factory {
  private readonly _orders: IOrder[] = [];
  private _currentOrder: IOrder | null = null;
  private _randomProducibleItem: Item | null = null;

  constructor(
    public readonly id: number = 1,
    public readonly name: string = 'Main Factory'
  ) {}

  get orders() {
    return this._orders;
  }

  get currentOrder() {
    return this._currentOrder;
  }

  get starItem() {
    return this._randomProducibleItem;
  }

  addOrder(order: IOrder) {
    this._orders.push(order);
  }

  setCurrentOrder(order: IOrder | null) {
    this._currentOrder = order;
  }

  clearOrders() {
    this._orders.length = 0;
  }
}
