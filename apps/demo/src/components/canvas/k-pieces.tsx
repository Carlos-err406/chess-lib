import { getTileCoords } from '#/lib/helpers'
import { useGame } from '@chess-lib/react-hooks'
import type { FC } from 'react'
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
