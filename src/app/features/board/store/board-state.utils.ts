import { ITile, IZone, Factory, Item, Obstacle } from '../models';

export function initializeTiles(size: number): ITile[][] {
  const tiles: ITile[][] = [];
  const factoryX = Math.floor(Math.random() * size);
  const factoryY = Math.floor(Math.random() * size);

  for (let y = 0; y < size; y++) {
    const row: ITile[] = [];
    for (let x = 0; x < size; x++) {
      const tile: ITile = { x, y, item: null, obstacle: null, factory: null };

      if (x === factoryX && y === factoryY) {
        tile.factory = new Factory();
      } else if (Math.random() < 0.3) {
        tile.obstacle = new Obstacle();
      } else {
        tile.item = new Item();
      }

      row.push(tile);
    }
    tiles.push(row);
  }
  return tiles;
}

export function initializeZones(tiles: ITile[][], size: number, zoneCount: number): IZone[] {
  const flatTiles = tiles.flat().filter(tile => !tile.factory);  // Get all tiles without a factory
  const zones: IZone[] = [];
  const maxZoneSize = Math.max(1, size - 1);

  for (let i = 0; i < zoneCount; i++) {
    const zoneTiles: ITile[] = [];
    const zoneSize = Math.floor(Math.random() * maxZoneSize) + 1;

    // Randomly select a starting tile for the zone
    let startTileIndex = Math.floor(Math.random() * flatTiles.length);
    let currentTile = flatTiles[startTileIndex];

    // Begin zone creation by adding the starting tile to zoneTiles
    zoneTiles.push(currentTile);
    let frontier = [currentTile];

    while (zoneTiles.length < zoneSize && frontier.length > 0) {
      const tile = frontier.shift()!;
      const neighbors = getNeighbors(tile.x, tile.y, flatTiles);

      neighbors.forEach(neighbor => {
        // Only add the tile to zoneTiles if it hasn't been added yet
        if (zoneTiles.length < zoneSize && !zoneTiles.includes(neighbor)) {
          zoneTiles.push(neighbor);
          frontier.push(neighbor);
        }
      });
    }

    const unlockCost = 50 + Math.floor(Math.random() * 6) * 100;
    const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

    // Add the zone with its unique tiles, color, and unlock cost
    zones.push({
      id: i + 1,
      color,
      tiles: zoneTiles,
      isUnlocked: false,
      unlockCost,
    });
  }
  return zones;
}

export function getNeighbors(x: number, y: number, tiles: ITile[]): ITile[] {
  const directions = [
    [0, 1],   // Down
    [1, 0],   // Right
    [0, -1],  // Up
    [-1, 0],  // Left
  ];

  return directions
    .map(([dx, dy]) => tiles.find(tile => tile.x === x + dx && tile.y === y + dy))
    .filter(tile => tile) as ITile[];
}
