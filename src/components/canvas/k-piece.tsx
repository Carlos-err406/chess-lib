import type { Piece } from '#/core/models/piece.ts'
import type { Vector2d } from 'konva/lib/types'
import type { FC } from 'react'
import { TILE_SIZE } from './conf'
import { URLImage } from './url-image'

export const KPiece: FC<{ piece: Piece; coord: Vector2d }> = ({
  piece,
  coord,
}) => {
  return (
    <URLImage
      src={piece.assetUrl}
      {...coord}
      width={TILE_SIZE}
      height={TILE_SIZE}
      align="center"
      verticalAlign="middle"
      shadowEnabled
      shadowOffset={{ x: 3, y: 3 }}
      shadowBlur={5}
      shadowOpacity={0.5}
    ></URLImage>
  )
}
