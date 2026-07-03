import { PIECE_MOVE_DURATION, PIECE_MOVE_EASING, TILE_SIZE } from '#/lib/conf';
import { buildPieceAssetUrl } from '#/lib/utils.ts';
import type { PieceTile } from '@chess-lib/core';
import { King } from '@chess-lib/core';
import { useTileAttackedFrom } from '@chess-lib/react-hooks';
import type Konva from 'konva';
import type { Vector2d } from 'konva/lib/types';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { URLImage } from './url-image';

export const KPiece: FC<{ tile: PieceTile; coord: Vector2d }> = ({
  tile,
  coord,
}) => {
  const ref = useRef<Konva.Image>(null)
  const drawnAt = useRef(coord)
  const attackedFrom = useTileAttackedFrom(tile)

  useEffect(() => {
    // piece movement animation
    const node = ref.current
    if (!node) return
    if (drawnAt.current.x === coord.x && drawnAt.current.y === coord.y) return
    node.moveToTop()
    node.to({
      x: coord.x,
      y: coord.y,
      duration: PIECE_MOVE_DURATION,
      easing: PIECE_MOVE_EASING,
    })
    drawnAt.current = coord
  }, [coord.x, coord.y])

  useEffect(() => {
    // tremble animation for when the king is in check
    const node = ref.current
    if (!node || !attackedFrom || !(tile.piece instanceof King)) return

    const baseX = coord.x
    const amp = 5
    const offsets = [amp, -amp, amp * 0.6, -amp * 0.6, 0] // decays to rest

    let i = 0
    const next = () => {
      if (i >= offsets.length) return
      node.to({
        x: baseX + offsets[i],
        duration: 0.05,
        onFinish: () => {
          i++
          next()
        },
      })
    }
    next()
  }, [attackedFrom?.name])

  return (
    <URLImage
      ref={ref}
      src={buildPieceAssetUrl(tile.piece.color, tile.piece.name)}
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
