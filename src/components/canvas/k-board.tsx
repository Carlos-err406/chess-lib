import type { Col, Row } from '#/core/models/board'
import { Board } from '#/core/models/board'
import { useBoardSelection } from '#/lib/state/use-board-selection.ts'
import { useGame } from '#/lib/state/use-game.ts'
import type { FC } from 'react'
import { Layer, Stage } from 'react-konva'
import { PromotionDialog } from '../promotion-dialog'
import { TILE_SIZE } from './conf'
import { KBoardLetters } from './k-board-letters'
import { KBoardNumbers } from './k-board-numbers'
import { KPieces } from './k-pieces'
import { KTile } from './k-tile'

export const KBoard: FC = () => {
  const game = useGame()
  const { selection, promotionTarget, clickTile, completePromotion } =
    useBoardSelection()

  const renderTile = (col: Col, row: Row) => {
    const tile = game.board.tileAtParts(col, row)
    return (
      <KTile
        key={`tile-${col}${row}`}
        tile={tile}
        onClick={() => clickTile(tile)}
        highlightLegalMove={
          selection?.moves.some((m) => m.name === tile.name) ?? false
        }
        highlightCapture={selection?.captureTargets.has(tile.name) ?? false}
      />
    )
  }
  return (
    <>
      <PromotionDialog
        open={!!promotionTarget}
        color={game.turnColor}
        onPieceSelected={completePromotion}
      />
      <Stage
        height={TILE_SIZE * 9}
        width={TILE_SIZE * 9}
        className="shadow-[0_0_10px_10px_#0000001a]"
      >
        <Layer>
          {Board.Rows.map((row) =>
            Board.Cols.map((col) => renderTile(col, row)),
          )}
          <KBoardLetters />
          <KBoardNumbers />
          <KPieces />
        </Layer>
      </Stage>
    </>
  )
}
