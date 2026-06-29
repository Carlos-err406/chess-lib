import { Board } from '#/core/models/board.ts'
import type { FC } from 'react'
import { Layer } from 'react-konva'
import { TILE_SIZE } from './conf'
import { KTile } from './k-tile'

export const KBoard: FC = () => {
  return (
    <Layer>
      {Board.Cols.map((col, i) => {
        return Board.Rows.map((row, j) => {
          return (
            <KTile
              key={`tile-${col}${row}`}
              color={(j + i) % 2 ? 'black' : 'white'}
              x={i * TILE_SIZE}
              y={j * TILE_SIZE}
            />
          )
        })
      })}
    </Layer>
  )
}
