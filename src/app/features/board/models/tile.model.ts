import { Factory } from "./factory.model";
import { Obstacle, Item, IZone } from "./";

export interface ITile {
  x: number;
  y: number;
  item?: Item | null;
  obstacle?: Obstacle | null;
  factory?: Factory | null;
  zoneId?: any;
  zone?: IZone | null;
}
