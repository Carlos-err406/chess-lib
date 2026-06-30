import { Board } from '#/core/models/board'
import type { FC } from 'react'
import { Text } from 'react-konva'
import { TILE_SIZE } from './conf'

export const KBoardNumbers: FC = () => {
  return Board.Rows.map((row) => (
    <>
      <Text
        key={`row-numbers-left-${row}`}
        text={row}
        x={TILE_SIZE / 4}
        y={TILE_SIZE * Number(row)}
        align={'center'}
        verticalAlign="middle"
      />
      <Text
        key={`row-numbers-right-${row}`}
        text={row}
        x={TILE_SIZE / 4 + TILE_SIZE * 8 + TILE_SIZE / 2}
        y={TILE_SIZE * Number(row)}
        align={'center'}
        verticalAlign="middle"
      />
    </>
  ))
}
