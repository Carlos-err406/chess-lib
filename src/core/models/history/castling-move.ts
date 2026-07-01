import type { TileName } from '../board'
import { Board } from '../board'
import { Colors } from '../pieces'
import { GenericMove } from './generic-move'
import { Move } from './move'

export class CastlingMove extends Move {
  private kingMove!: GenericMove
  private rookMove!: GenericMove

  constructor(from: TileName, to: TileName) {
    super(from, to)
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
    this.kingMove = new GenericMove(this.from, this.to)
    this.rookMove = new GenericMove(rookFrom, rookTo)
    this.kingMove.apply(board)
    this.rookMove.apply(board)
  }

  undo(board: Board): void {
    this.rookMove.undo(board)
    this.kingMove.undo(board)
  }

  get metadata() {
    return [...this.kingMove.metadata, ...this.rookMove.metadata]
  }
}
