import type { Tile } from '@chess-lib/core'
import { Game } from '@chess-lib/core'
import { useGame } from './use-game'

/** checks if the tile's piece is a king and then computes the check status */
export const useTileAttackedFrom = (tile: Tile) => {
  const game = useGame()
  return game.getSquareAttacker(tile, Game.enemyOf(game.turnColor))
}
