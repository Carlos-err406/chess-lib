import type { Col, Row, Tile } from '#/core/models/board'
import { Board } from '#/core/models/board'
import { gameStore } from '#/lib/state/game-state.ts'
import { useGame } from '#/lib/state/use-game.ts'
import type { FC } from 'react'
import { useState } from 'react'
import { Layer } from 'react-konva'
import { KBoardLetters } from './k-board-letters'
import { KBoardNumbers } from './k-board-numbers'
import { KPieces } from './k-pieces'
import { KTile } from './k-tile'

export const KBoard: FC = () => {
  const game = useGame()
  const [legalMoves, setLegalMoves] = useState<{
    from: Tile | null
    to: Tile[]
  }>({ from: null, to: [] })

  const handleTileClick = (tile: Tile) => {
    // A selection is active → this click is either a move or a reselect/clear
    if (legalMoves.from) {
      // clicked a legal target → attempt the move
      if (legalMoves.to.includes(tile)) {
        gameStore.tryMove(legalMoves.from, tile)
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

  const renderBoard = () =>
    Board.Rows.map((rowNumber: Row) =>
      Board.Cols.map((col) => renderTile(col, rowNumber)),
    )

  const renderTile = (col: Col, row: Row) => {
    const tile = game.board.tileAtParts(col, row)
    const highlightLegalMove = legalMoves.to.some((move) => move == tile)
    return (
      <KTile
        key={`tile-${col}${row}`}
        tile={tile}
        onClick={() => handleTileClick(tile)}
        highlightLegalMove={highlightLegalMove}
      />
    )
  }
  return (
    <Layer>
      {renderBoard()}
      <KPieces />
      <KBoardLetters />
      <KBoardNumbers />
    </Layer>
  )
}
