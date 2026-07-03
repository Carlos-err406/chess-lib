import { TILE_SIZE } from '#/lib/conf'
import { useElementSize } from '#/lib/use-element-size'
import type { Col, Row } from '@chess-lib/core'
import { Board } from '@chess-lib/core'
import { useBoardSelection, useGame } from '@chess-lib/react-hooks'
import type { FC } from 'react'
import { Layer, Stage } from 'react-konva'
import { PromotionDialog } from '../promotion-dialog'
import { KBoardLetters } from './k-board-letters'
import { KBoardNumbers } from './k-board-numbers'
import { KPieces } from './k-pieces'
import { KTile } from './k-tile'

// The board is drawn in a fixed coordinate space (9 tiles: 8 ranks/files + the
// coordinate gutter). We scale the whole Stage to fit its container so every
// child keeps using these design-space units.
const BOARD_SIZE = TILE_SIZE * 9

export const KBoard: FC = () => {
  const game = useGame()
  const { selection, promotionTarget, clickTile, completePromotion } =
    useBoardSelection()

  const [containerRef, { width, height }] = useElementSize<HTMLDivElement>()
  const size = Math.floor(Math.min(width, height))
  const scale = size / BOARD_SIZE

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
      <div
        ref={containerRef}
        className="flex h-full w-full items-center justify-center"
      >
        {size > 0 && (
          <Stage
            height={size}
            width={size}
            scaleX={scale}
            scaleY={scale}
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
        )}
      </div>
    </>
  )
}
