import { Board } from '#/core/models/board'
import type { FC } from 'react'
import { Fragment } from 'react'
import { Text } from 'react-konva'
import { TILE_SIZE } from './conf'

export const KBoardNumbers: FC = () => {
  const calculateY = (row: number) => {
    const pos = Board.Rows.length - Number(row) // 1 at the bottom 8 at the top
    const spread = TILE_SIZE
    const boardOffset = TILE_SIZE
    return pos * spread + boardOffset
  }
  return Board.Rows.map((row) => (
    <Fragment key={`row-numbers-${row}`}>
      <Text
        text={row}
        x={TILE_SIZE / 4}
        y={calculateY(Number(row))}
        align="center"
        verticalAlign="middle"
      />
      <Text
        text={row}
        x={TILE_SIZE / 4 + TILE_SIZE * 8 + TILE_SIZE / 2}
        y={calculateY(Number(row))}
        align="center"
        verticalAlign="middle"
      />
    </Fragment>
  ))
}
