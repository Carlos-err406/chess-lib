import type { Board } from '../board'
import type { Piece } from '../pieces'
import type { TileName } from '../board/tile'
import { Move } from './move'

export class GenericMove extends Move {
  protected captured: Piece | null = null
  protected movedPiece: Piece | null = null
  protected flippedMovedFlag = false

  constructor(
    protected from: TileName,
    protected to: TileName,
  ) {
    super()
  }

  apply(board: Board) {
    const res = board.move(this.from, this.to)
    if (!res) return
    this.captured = res.captured
    this.movedPiece = res.movedPiece
    this.flippedMovedFlag = res.flippedMovedFlag
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
        pieceAsset: this.movedPiece?.assetUrl ?? '',
      },
    ]
  }
}
