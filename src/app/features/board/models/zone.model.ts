import { ITile } from "./tile.model";

export interface IZone {
  id: number;
  tiles: ITile[];
  isUnlocked: boolean;
  unlockCost: number;
  color: string;
}
