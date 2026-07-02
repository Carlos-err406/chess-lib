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
    captureTargets: Set<string>
  }>({ from: null, to: [], captureTargets: new Set() })

  const handleTileClick = (tile: Tile) => {
    // A selection is active → this click is either a move or a reselect/clear
    if (legalMoves.from) {
      // clicked a legal target → attempt the move
      gameStore.tryMove(legalMoves.from, tile)
      setLegalMoves({
        from: null,
        to: [],
        captureTargets: new Set(),
      }) // clear after moving
      return
    }

    // (Re)selection: only select a piece whose turn it is
    if (tile.piece && tile.piece.color === game.turnColor) {
      const newLegalMoves = game.getLegalMoves(tile)
      setLegalMoves({
        from: tile,
        to: newLegalMoves,
        captureTargets: new Set(
          newLegalMoves
            .filter((to) => to.piece !== null || game.isEnPassant(tile, to))
            .map((t) => t.name),
        ),
      })
      return
    }

    // clicked empty/enemy with nothing valid to select → clear
    setLegalMoves({ from: null, to: [], captureTargets: new Set() })
  }

  const renderBoard = () =>
    Board.Rows.map((rowNumber: Row) =>
      Board.Cols.map((col) => renderTile(col, rowNumber)),
    )

  const renderTile = (col: Col, row: Row) => {
    const tile = game.board.tileAtParts(col, row)
    const highlightLegalMove = legalMoves.to.some((move) => move == tile)
    const highlightCapture = legalMoves.captureTargets.has(tile.name)
    return (
      <KTile
        key={`tile-${col}${row}`}
        tile={tile}
        onClick={() => handleTileClick(tile)}
        highlightLegalMove={highlightLegalMove}
        highlightCapture={highlightCapture}
      />
    )
  }
  return (
    <Layer>
      {renderBoard()}
      <KBoardLetters />
      <KBoardNumbers />
      <KPieces />
    </Layer>
  )
}
