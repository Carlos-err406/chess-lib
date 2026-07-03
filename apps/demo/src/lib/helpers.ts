import { TILE_SIZE } from '#/lib/conf'
import type { Tile } from '@chess-lib/core'
import { Board } from '@chess-lib/core'

export const getTileCoords = (tile: Tile) => {
  const x = tile.col * TILE_SIZE + TILE_SIZE / 2
  const y = (Board.Rows.length - 1 - tile.row) * TILE_SIZE + TILE_SIZE / 2 // whites at the bottom
  return { x, y }
}
