import { TILE_SIZE } from '#/lib/conf'
import { Board } from '@chess-lib/core'
import type { FC } from 'react'
import { Fragment } from 'react'
import { Text } from 'react-konva'

export const KBoardLetters: FC = () => {
  return Board.Cols.map((col, i) => (
    <Fragment key={`col-letters-${col}`}>
      <Text
        text={col}
        x={TILE_SIZE * (i + 1)}
        y={TILE_SIZE / 3}
        align={'center'}
        verticalAlign="middle"
      />
      <Text
        text={col}
        x={TILE_SIZE * (i + 1)}
        y={TILE_SIZE / 2 + TILE_SIZE * 8 + TILE_SIZE / 10}
        align={'center'}
        verticalAlign="middle"
      />
    </Fragment>
  ))
}
