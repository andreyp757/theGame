import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { IHostBoard, Item, ITile, IZone, Obstacle } from '../models';
import { getNeighbors, initializeTiles, initializeZones } from './board-state.utils';
import { InventoryStore } from '../../inventory/store/inventory-state.store';

const GRID_SIZE = 7;
const MAX_ZONE_COUNT = 3;

interface IBoardState {
  board: IHostBoard;
  tiles: ITile[][];
  zones: IZone[];
  highlightedZone: number | null;
  mergeItems: number[];
}

const tiles = initializeTiles(GRID_SIZE);
const zones = initializeZones(tiles, GRID_SIZE, MAX_ZONE_COUNT);
const initialState: IBoardState = {
  board: { gridSize: GRID_SIZE },
  tiles,
  zones,
  highlightedZone: null,
  mergeItems: []
};

function getTileZone(tile: ITile, zones: IZone[]): IZone | null {
  return zones.find(zone => zone.tiles.some(zoTile => zoTile.x === tile.x && zoTile.y === tile.y)) || null;
}

function filterMergeableNeighbors(neighbors: ITile[], item: Item): ITile[] {
  return neighbors.filter(neighbor => !neighbor.zone && neighbor.item && neighbor.item.level === item.level);
}

export const BoardStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(state => ({

    tilesWithZones: computed(() => {
      return state.tiles().map(row => row.map((tile: ITile) => ({
        ...tile,
        zone: getTileZone(tile, state.zones())
      })));
    })

  })),
  withMethods((state, inventoryStore = inject(InventoryStore)) => ({

    removeZone(zone: IZone) {
      if (inventoryStore.takeFunds(zone.unlockCost)) {
        const updatedZones = state.zones().filter(zo => zo.id !== zone.id);
        patchState(state, { zones: updatedZones });
      }
    },

    removeObstacle(obstacle: Obstacle) {
      if (inventoryStore.takeFunds(obstacle.removalCost)) {
        const updatedTiles = state.tiles().map(row =>
          row.map(tile => tile.obstacle?.id === obstacle.id ? { ...tile, obstacle: null, item: new Item() } : tile)
        );
        patchState(state, { tiles: updatedTiles });
      }
    },

    highlightZone(zoneId: number | null = null) {
      patchState(state, { highlightedZone: zoneId });
    },

    processMerge(item: Item | null = null, tileCoords: { x: number, y: number } | null = null, shouldUpgrade: boolean = false) {
      if (!item || !tileCoords) {
        patchState(state, { mergeItems: [] });
        return;
      }

      const tiles = state.tilesWithZones().flat();
      const neighbors = getNeighbors(tileCoords.x, tileCoords.y, tiles);
      const mergeableNeighbors = filterMergeableNeighbors(neighbors, item);

      if (mergeableNeighbors.length >= 2) {
        if (shouldUpgrade) {
          mergeableNeighbors.slice(0, 2).forEach(val => val.item?.reset());
          patchState(state, { mergeItems: [] });
          item.updateLevel();
        } else {
          const additionalIds = mergeableNeighbors.slice(0, 2).map(tile => tile.item?.id).filter(id => id !== undefined);
          patchState(state, { mergeItems: [item.id, ...additionalIds] });
          item.setCollectible(true);
        }
      } else {
        item.setCollectible(false);
      }
    },

    sellItem(item: Item) {
      inventoryStore.addFunds(item.cost);
      item.reset();
    }

  }))
);
