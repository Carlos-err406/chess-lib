import type { Piece } from '#/core/models/piece.ts'
import type { Tile } from '#/core/models/tile.ts'
import type { FC } from 'react'
import { useState } from 'react'
import { Group, Rect, Text } from 'react-konva'
import {
  TILE_COLOR,
  TILE_HOVER_STROKE_WIDTH,
  TILE_SIZE,
  TILE_STROKE,
} from './conf'
import { Board } from '#/core/models/board.ts'

export const KTile: FC<{
  tile: Tile
  piece: Piece | null
}> = ({ tile, piece }) => {
  const [hovering, setHovering] = useState(false)
  const strokeWidth = hovering ? TILE_HOVER_STROKE_WIDTH : 0
  const x = tile.col * TILE_SIZE
  const y = (Board.Rows.length - 1 - tile.row) * TILE_SIZE // whites at the bottom
  return (
    <Group
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Rect
        x={x + strokeWidth / 2}
        y={y + strokeWidth / 2}
        width={TILE_SIZE - strokeWidth}
        height={TILE_SIZE - strokeWidth}
        fill={TILE_COLOR[tile.color]}
        stroke={TILE_STROKE}
        strokeWidth={strokeWidth}
      />
      <Text
        text={piece?.key ?? ''}
        x={x}
        y={y}
        width={TILE_SIZE}
        height={TILE_SIZE}
        align="center"
        verticalAlign="middle"
      />
    </Group>
  )
}
