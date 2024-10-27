export class Item {
  constructor(
    public readonly id: number = Item.generateDefaultId(),
    public readonly name: string = 'Random Item',
    public readonly type: string = 'Random Type',
    private _level: number = 1,
    private _cost: number = Item.generateDefaultCost(),
    private _isCollectible: boolean = false,
    public readonly transformInto: Item | null = null,
    public readonly combineItemsRules: number[] = [],
  ) {}

  static generateDefaultId() {
    return Math.floor(Math.random() * 10000);
  }

  static generateDefaultCost() {
    return Math.floor(Math.random() * (10 - 2 + 1)) + 2;
  }

  get level() {
    return this._level;
  }

  get cost() {
    return this._cost;
  }

  get isCollectible() {
    return this._isCollectible;
  }

  updateLevel() {
    this._level += 1;
    this._cost = Item.generateDefaultCost() * this._level;
  }

  setCollectible(param: boolean) {
    this._isCollectible = param;
  }

  reset() {
    Object.assign(this, new Item());
  }
}

