import { game } from '#/state/game-state.ts'
import type { FC } from 'react'
import { getTileCoords } from './helpers'
import { KPiece } from './k-piece'

export const KPieces: FC = () => {
  const pieceTiles = game.board.getTilesWithPieces()
  return pieceTiles.map((tile) => {
    const piece = tile.piece!
    return (
      <KPiece
        key={`piece-${piece.id}`}
        piece={piece}
        coord={getTileCoords(tile)}
      />
    )
  })
}
