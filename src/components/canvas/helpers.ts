import type { Tile } from '#/core/models/board'
import { Board } from '#/core/models/board'
import { TILE_SIZE } from './conf'

export const getTileCoords = (tile: Tile) => {
  const x = tile.col * TILE_SIZE + TILE_SIZE / 2
  const y = (Board.Rows.length - 1 - tile.row) * TILE_SIZE + TILE_SIZE / 2 // whites at the bottom
  return { x, y }
}
