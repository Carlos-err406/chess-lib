import { useGame } from '#/state/use-game.ts'
import type { FC } from 'react'
import { getTileCoords } from './helpers'
import { KPiece } from './k-piece'

export const KPieces: FC = () => {
  const game = useGame()
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
