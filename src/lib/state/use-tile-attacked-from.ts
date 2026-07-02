import type { Tile } from '#/core/models/board'
import { Game } from '#/core/models/game.ts'
import { useGame } from './use-game'

/** checks if the tile's piece is a king and then computes the check status */
export const useTileAttackedFrom = (tile: Tile) => {
  const game = useGame()
  return game.getSquareAttacker(tile, Game.enemyOf(game.turnColor))
}
