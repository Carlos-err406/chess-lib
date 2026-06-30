import type { Tile } from '#/core/models/board'
import { Board } from '#/core/models/board'
import { game } from '#/state/game-state.ts'
import type { FC } from 'react'
import { useState } from 'react'
import { Layer } from 'react-konva'
import { KTile } from './k-tile'

export const KBoard: FC = () => {
  const [legalMoves, setLegalMoves] = useState<{
    from: Tile | null
    to: Tile[]
  }>({ from: null, to: [] })

  const board = game.board

  const handleTileClick = (tile: Tile) => {
    // A selection is active → this click is either a move or a reselect/clear
    if (legalMoves.from) {
      // clicked a legal target → attempt the move
      if (legalMoves.to.includes(tile)) {
        game.tryMove(legalMoves.from, tile)
        setLegalMoves({ from: null, to: [] }) // clear after moving
        return
      }
      // clicked something else → fall through to (re)selection logic below
    }

    // (Re)selection: only select a piece whose turn it is
    if (tile.piece && tile.piece.color === game.turnColor) {
      setLegalMoves({ from: tile, to: game.getLegalMoves(tile) })
      return
    }

    // clicked empty/enemy with nothing valid to select → clear
    setLegalMoves({ from: null, to: [] })
  }

  return (
    <Layer>
      {Board.Rows.map((row) =>
        Board.Cols.map((col) => {
          const tile = board.tileAtParts(col, row)
          const highlightLegalMove = legalMoves.to.some((move) => move == tile)
          return (
            <KTile
              key={`tile-${col}${row}`}
              tile={tile}
              onClick={() => handleTileClick(tile)}
              highlightLegalMove={highlightLegalMove}
            />
          )
        }),
      )}
    </Layer>
  )
}
