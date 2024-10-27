import { Item } from "./item.model";

export class Obstacle {
  constructor(
    public readonly id: number = Math.floor(Math.random() * 10000),
    private _removalCost: number = 50 + Math.floor(Math.random() * 6) * 10,
    private _rewardItem: Item | null = null
  ) {}

  get removalCost() {
    return this._removalCost;
  }

  get rewardItem() {
    return this._rewardItem;
  }
}
