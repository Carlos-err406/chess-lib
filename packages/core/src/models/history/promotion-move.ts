import type { Board } from '../board'
import type { TileName } from '../board/tile'
import type { Piece } from '../pieces'
import { Bishop, Knight, Queen, Rook } from '../pieces'
import { Move } from './move'

export type PromotionPieceName = keyof typeof PromotionMove.PROMOTION_PIECES
export class PromotionMove extends Move {
  public static readonly PROMOTION_PIECES = { Queen, Rook, Bishop, Knight }
  private captured: Piece | null = null
  private movedPiece: Piece | null = null
  private flippedMovedFlag = false

  constructor(
    from: TileName,
    to: TileName,
    private promotedTo: PromotionPieceName,
  ) {
    super(from, to)
  }

  apply(board: Board) {
    const res = board.move(this.from, this.to)
    if (!res) return
    this.captured = res.captured
    this.movedPiece = res.movedPiece
    this.flippedMovedFlag = res.flippedMovedFlag
    const promoted = new PromotionMove.PROMOTION_PIECES[this.promotedTo](
      this.movedPiece.color,
      true,
      this.movedPiece.id,
    )
    board.tileAtName(this.to).setPiece(promoted)
  }

  undo(board: Board) {
    if (!this.movedPiece) return // never applied (or apply failed)
    const fromTile = board.tileAtName(this.from)
    const toTile = board.tileAtName(this.to)
    toTile.setPiece(this.captured) // restore whatever was on `to` (piece or null)
    this.movedPiece.moved = !this.flippedMovedFlag // reverse the moved-flag flip
    fromTile.setPiece(this.movedPiece) // put the mover back on `from`
  }

  get metadata() {
    return [
      {
        from: this.from,
        to: this.to,

        movedPieceName: this.movedPiece!.name,
        movedPieceColor: this.movedPiece!.color,
        promotedTo: this.promotedTo,
      },
    ]
  }
}
