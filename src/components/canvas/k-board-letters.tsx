import { Board } from '#/core/models/board'
import type { FC } from 'react'
import { Text } from 'react-konva'
import { TILE_SIZE } from './conf'

export const KBoardLetters: FC = () => {
  return Board.Cols.map((col, i) => (
    <>
      <Text
        key={`col-letters-up-${col}`}
        text={col}
        x={TILE_SIZE * (i + 1)}
        y={TILE_SIZE / 3}
        align={'center'}
        verticalAlign="middle"
      />
      <Text
        key={`col-letters-down-${col}`}
        text={col}
        x={TILE_SIZE * (i + 1)}
        y={TILE_SIZE / 2 + TILE_SIZE * 8 + TILE_SIZE / 10}
        align={'center'}
        verticalAlign="middle"
      />
    </>
  ))
}
