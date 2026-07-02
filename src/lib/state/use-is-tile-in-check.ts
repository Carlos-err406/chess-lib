import type { Tile } from '#/core/models/board'
import { Game } from '#/core/models/game.ts'
import { useGame } from './use-game'

/** checks if the tile's piece is a king and then computes the check status */
export const useIsTileAttacked = (tile: Tile) => {
  const game = useGame()
  const isAttacked =
    tile.piece && game.isSquareAttacked(tile, Game.enemyOf(tile.piece.color))
  return isAttacked ?? false
}
