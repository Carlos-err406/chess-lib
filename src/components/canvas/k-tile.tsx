import type { Color } from '#/core/models/piece.ts'
import type { FC } from 'react'
import { useState } from 'react'
import { Rect } from 'react-konva'
import {
  TILE_COLOR,
  TILE_HOVER_STROKE_WIDTH,
  TILE_SIZE,
  TILE_STROKE,
} from './conf'

export const KTile: FC<{
  color: Color
  x: number
  y: number
}> = ({ color, x, y }) => {
  const [hovering, setHovering] = useState(false)
  const strokeWidth = hovering ? TILE_HOVER_STROKE_WIDTH : 0
  return (
    <Rect
      x={x + strokeWidth / 2}
      y={y + strokeWidth / 2}
      width={TILE_SIZE - strokeWidth}
      height={TILE_SIZE - strokeWidth}
      fill={TILE_COLOR[color]}
      stroke={TILE_STROKE}
      strokeWidth={strokeWidth}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    />
  )
}
