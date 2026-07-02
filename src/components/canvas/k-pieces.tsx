import { useGame } from '#/lib/state/use-game.ts'
import type { FC } from 'react'
import { getTileCoords } from './helpers'
import { KPiece } from './k-piece'

export const KPieces: FC = () => {
  const game = useGame()
  const pieceTiles = game.board.getTilesWithPieces()
  return pieceTiles.map((tile) => {
    return (
      <KPiece
        key={`piece-${tile.piece.id}`}
        tile={tile}
        coord={getTileCoords(tile)}
      />
    )
  })
}
