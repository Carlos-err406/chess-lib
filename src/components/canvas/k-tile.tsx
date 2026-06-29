import { Board } from '#/core/models/board.ts'
import type { Tile } from '#/core/models/tile.ts'
import type { FC } from 'react'
import { useState } from 'react'
import { Group, Rect } from 'react-konva'
import {
  TILE_COLOR,
  TILE_HIGHLIGHTED_LEGAL_MOVE_COLOR,
  TILE_HOVER_STROKE_WIDTH,
  TILE_SIZE,
  TILE_STROKE_COLOR,
} from './conf'
import { KPiece } from './k-piece'

export const KTile: FC<{
  tile: Tile
  highlightLegalMove?: boolean
  onClick: () => void
}> = ({ tile, onClick, highlightLegalMove = false }) => {
  const [hovering, setHovering] = useState(false)
  const strokeWidth =
    hovering || highlightLegalMove ? TILE_HOVER_STROKE_WIDTH : 0
  const strokeColor = highlightLegalMove
    ? TILE_HIGHLIGHTED_LEGAL_MOVE_COLOR
    : TILE_STROKE_COLOR
  const x = tile.col * TILE_SIZE
  const y = (Board.Rows.length - 1 - tile.row) * TILE_SIZE // whites at the bottom
  const coord = { x, y }
  return (
    <Group
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={onClick}
    >
      <Rect
        x={x + strokeWidth / 2}
        y={y + strokeWidth / 2}
        width={TILE_SIZE - strokeWidth}
        height={TILE_SIZE - strokeWidth}
        fill={TILE_COLOR[tile.shade]}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      {tile.piece && <KPiece {...{ piece: tile.piece, coord }} />}
    </Group>
  )
}
