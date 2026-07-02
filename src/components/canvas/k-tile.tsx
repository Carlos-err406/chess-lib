import type { Tile } from '#/core/models/board/tile.ts'
import { useIsTileAttacked } from '#/lib/state/use-is-tile-in-check.ts'
import type { FC } from 'react'
import { useState } from 'react'
import { Circle, Group, Rect } from 'react-konva'
import {
  TILE_COLOR,
  TILE_HIGHLIGHTED_CHECK_COLOR,
  TILE_HIGHLIGHTED_LEGAL_MOVE_COLOR,
  TILE_HOVER_STROKE_WIDTH,
  TILE_SIZE,
  TILE_STROKE_COLOR,
} from './conf'
import { getTileCoords } from './helpers'
import { King } from '#/core/models/pieces/index.ts'

export const KTile: FC<{
  tile: Tile
  highlightLegalMove?: boolean
  onClick: () => void
}> = ({ tile, onClick, highlightLegalMove = false }) => {
  const [hovering, setHovering] = useState(false)

  const isAttacked = useIsTileAttacked(tile)
  const isCheck = tile.piece instanceof King && isAttacked

  const showStroke = hovering
  const strokeWidth = showStroke ? TILE_HOVER_STROKE_WIDTH : 0

  const highlightColor = isCheck
    ? TILE_HIGHLIGHTED_CHECK_COLOR
    : highlightLegalMove
      ? TILE_HIGHLIGHTED_LEGAL_MOVE_COLOR(isAttacked)
      : 'transparent'

  const { x, y } = getTileCoords(tile)

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
        stroke={TILE_STROKE_COLOR}
        strokeWidth={strokeWidth}
      />

      <Circle
        x={x + TILE_SIZE / 2}
        y={y + TILE_SIZE / 2}
        radius={TILE_SIZE / 3.5}
        fill={highlightColor}
        opacity={0.4}
        shadowColor={highlightColor}
        shadowBlur={50}
        shadowOffset={{ x: 0, y: 0 }}
        shadowEnabled
      />
    </Group>
  )
}
