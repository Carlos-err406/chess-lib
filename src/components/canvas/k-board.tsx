import { Board } from '#/core/models/board.ts'
import { Tile } from '#/core/models/tile.ts'
import type { FC } from 'react'
import { Layer } from 'react-konva'
import { KTile } from './k-tile'

export const KBoard: FC = () => {
  const board = new Board()

  return (
    <Layer>
      {board.grid.map((row, rowIdx) =>
        row.map((piece, colIdx) => (
          <KTile
            key={`tile-${Board.Cols[colIdx]}${Board.Rows[rowIdx]}`}
            tile={new Tile(colIdx, rowIdx)}
            piece={piece}
          />
        )),
      )}
    </Layer>
  )
}
