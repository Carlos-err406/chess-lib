import { useState, useCallback } from 'react'
import type { Tile, PromotionPieceName } from '@chess-lib/core'
import { Game } from '@chess-lib/core'
import { gameStore } from './game-state.ts'
import { useGame } from './use-game.ts'

type Selection = {
  from: Tile
  moves: Tile[]
  captureTargets: Set<string>
}

const EMPTY_SELECTION = null

export function useBoardSelection() {
  const game = useGame()
  const [selection, setSelection] = useState<Selection | null>(EMPTY_SELECTION)
  const [promotionTarget, setPromotionTarget] = useState<Tile | null>(null)

  const select = useCallback(
    (tile: Tile) => {
      if (!tile.piece || tile.piece.color !== game.turnColor) {
        setSelection(null)
        return
      }
      const moves = game.getLegalMoves(tile)
      setSelection({
        from: tile,
        moves,
        captureTargets: new Set(
          moves
            .filter((to) => to.piece !== null || game.isEnPassant(tile, to))
            .map((t) => t.name),
        ),
      })
    },
    [game],
  )

  const clickTile = useCallback(
    (tile: Tile) => {
      // no active selection → try to select
      if (!selection) return select(tile)

      // active selection → this is a move attempt (or reselect)
      if (Game.isPromotionMove(selection.from, tile)) {
        setPromotionTarget(tile)
        return
      }
      gameStore.tryMove(selection.from, tile)
      setSelection(null)
    },
    [selection, select],
  )

  const completePromotion = useCallback(
    (promoteTo: PromotionPieceName) => {
      if (!selection || !promotionTarget) return
      gameStore.tryMove(selection.from, promotionTarget, promoteTo)
      setPromotionTarget(null)
      setSelection(null)
    },
    [selection, promotionTarget],
  )

  return {
    selection,
    promotionTarget,
    clickTile,
    completePromotion,
  }
}
