import type { TileName } from '../board'
import { Board } from '../board'
import { Colors } from '../pieces'
import { BatchMove } from './batch-move'
import { GenericMove } from './generic-move'
import { Move } from './move'

export class CastlingMove extends Move {
  private move!: BatchMove

  constructor(
    private from: TileName,
    private to: TileName,
  ) {
    super()
  }

  apply(board: Board) {
    const fromTile = board.tileAtName(this.from)
    const toTile = board.tileAtName(this.to)
    // derive rook's from/to from the king's from/to (king tells us the side)
    const kingside = toTile.col > fromTile.col
    const king = fromTile.piece!
    const rank =
      king.color === Colors.WHITE
        ? Board.WHITE_BACK_RANK
        : Board.BLACK_BACK_RANK

    const rookFrom: TileName = kingside ? `H${rank}` : `A${rank}`
    const rookTo: TileName = kingside ? `F${rank}` : `D${rank}`
    this.move = new BatchMove([
      new GenericMove(this.from, this.to),
      new GenericMove(rookFrom, rookTo),
    ])
    this.move.apply(board)
  }

  undo(board: Board): void {
    // reverse order: rook first, then king (or either, since squares are disjoint)
    this.move.undo(board)
  }
}
