import type { Board } from '../board'
import type { TileName } from '../board/tile'
import type { Piece } from '../pieces'
import { Move } from './move'

export class InPassantMove extends Move {
  private movedPawn: Piece | null = null
  private capturedPawn: Piece | null = null
  private capturedSquare: TileName | null = null
  private flippedMovedFlag = false
  constructor(
    private from: TileName,
    private to: TileName,
  ) {
    super()
  }

  apply(board: Board) {
    const fromTile = board.tileAtName(this.from)
    const toTile = board.tileAtName(this.to)
    const movedPawn = fromTile.piece
    if (!movedPawn) return

    // the captured pawn sits on the moving pawn's ROW, in the destination's COL
    const capturedTile = board.tileAt(toTile.col, fromTile.row) // (col, row)
    this.capturedPawn = capturedTile.piece
    this.capturedSquare = capturedTile.name
    this.movedPawn = movedPawn

    // execute: move our pawn, remove the captured pawn from its (different) square
    this.flippedMovedFlag = movedPawn.moved === false
    movedPawn.moved = true
    toTile.setPiece(movedPawn)
    fromTile.setPiece(null)
    capturedTile.setPiece(null)
    return
  }

  undo(board: Board): void {
    if (!this.movedPawn || !this.capturedSquare) return
    const fromTile = board.tileAtName(this.from)
    const toTile = board.tileAtName(this.to)
    const capturedTile = board.tileAtName(this.capturedSquare)

    fromTile.setPiece(this.movedPawn)
    toTile.setPiece(null)
    capturedTile.setPiece(this.capturedPawn)
    this.movedPawn.moved = !this.flippedMovedFlag
  }
}
