import type { Board } from '../board'
import type { TileName } from '../board/tile'
import type { Piece } from '../pieces'
import { Move } from './move'

export class InPassantMove extends Move {
  private movedPiece: Piece | null = null
  private capturedPiece: Piece | null = null
  private capturedSquare: TileName | null = null
  private flippedMovedFlag = false
  constructor(from: TileName, to: TileName) {
    super(from, to)
  }

  apply(board: Board) {
    const fromTile = board.tileAtName(this.from)
    const toTile = board.tileAtName(this.to)
    const movedPawn = fromTile.piece
    if (!movedPawn) return

    // the captured pawn sits on the moving pawn's ROW, in the destination's COL
    const capturedTile = board.tileAt(toTile.col, fromTile.row) // (col, row)
    this.capturedPiece = capturedTile.piece
    this.capturedSquare = capturedTile.name
    this.movedPiece = movedPawn

    // execute: move our pawn, remove the captured pawn from its (different) square
    this.flippedMovedFlag = movedPawn.moved === false
    movedPawn.moved = true
    toTile.setPiece(movedPawn)
    fromTile.setPiece(null)
    capturedTile.setPiece(null)
    return
  }

  undo(board: Board): void {
    if (!this.movedPiece || !this.capturedSquare) return
    const fromTile = board.tileAtName(this.from)
    const toTile = board.tileAtName(this.to)
    const capturedTile = board.tileAtName(this.capturedSquare)

    fromTile.setPiece(this.movedPiece)
    toTile.setPiece(null)
    capturedTile.setPiece(this.capturedPiece)
    this.movedPiece.moved = !this.flippedMovedFlag
  }

  get metadata() {
    return [
      {
        from: this.from,
        to: this.to,

        movedPieceName: this.movedPiece!.name,
        movedPieceColor: this.movedPiece!.color,

        capturedPieceName: this.capturedPiece?.name,
        capturedPieceColor: this.capturedPiece?.color,
        capturedPieceValue: this.capturedPiece?.value,
      },
    ]
  }
}
