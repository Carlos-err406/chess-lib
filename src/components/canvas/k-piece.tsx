import type { Piece } from '#/core/models/pieces'
import type Konva from 'konva'
import type { Vector2d } from 'konva/lib/types'
import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import { PIECE_MOVE_DURATION, PIECE_MOVE_EASING, TILE_SIZE } from './conf'
import { URLImage } from './url-image'

export const KPiece: FC<{ piece: Piece; coord: Vector2d }> = ({
  piece,
  coord,
}) => {
  const ref = useRef<Konva.Image>(null)
  // Where the node is currently drawn. Lags `coord` by one move so the tween
  // can run from the old square to the new one.
  const drawnAt = useRef(coord)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (drawnAt.current.x === coord.x && drawnAt.current.y === coord.y) return
    node.moveToTop() // slide over other pieces while moving
    node.to({
      x: coord.x,
      y: coord.y,
      duration: PIECE_MOVE_DURATION,
      easing: PIECE_MOVE_EASING, // constant-speed straight line
    })
    drawnAt.current = coord
  }, [coord.x, coord.y])

  return (
    <URLImage
      ref={ref}
      src={piece.assetUrl}
      x={drawnAt.current.x}
      y={drawnAt.current.y}
      width={TILE_SIZE}
      height={TILE_SIZE}
      align="center"
      verticalAlign="middle"
      listening={false} // so mouse events go through to the tile
      shadowEnabled
      shadowOffset={{ x: 3, y: 3 }}
      shadowBlur={5}
      shadowOpacity={0.5}
    ></URLImage>
  )
}
