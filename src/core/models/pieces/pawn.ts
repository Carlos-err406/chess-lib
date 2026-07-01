import type { Board } from '../board'
import type { Tile } from '../board/tile'
import type { MoveDelta } from './piece'
import {
  Colors,
  MOVE_DIAG_DOWN_LEFT,
  MOVE_DIAG_DOWN_RIGHT,
  MOVE_DIAG_UP_LEFT,
  MOVE_DIAG_UP_RIGHT,
  MOVE_DOWN,
  MOVE_DOWN2,
  MOVE_UP,
  MOVE_UP2,
  MoveKinds,
  Piece,
  TileKinds,
} from './piece'

export class Pawn extends Piece {
  public static WHITE_MOVE_DELTAS: MoveDelta[] = [MOVE_UP]
  public static WHITE_START_MOVE_DELTAS: MoveDelta[] = [MOVE_UP, MOVE_UP2]
  public static WHITE_CAPTURE_DELTAS: MoveDelta[] = [
    MOVE_DIAG_UP_LEFT,
    MOVE_DIAG_UP_RIGHT,
  ]
  public static BLACK_MOVE_DELTAS: MoveDelta[] = [MOVE_DOWN]
  public static BLACK_START_MOVE_DELTAS: MoveDelta[] = [MOVE_DOWN, MOVE_DOWN2]
  public static BLACK_CAPTURE_DELTAS: MoveDelta[] = [
    MOVE_DIAG_DOWN_LEFT,
    MOVE_DIAG_DOWN_RIGHT,
  ]

  public static VALUE = 1
  private captureDeltas: MoveDelta[]

  constructor(color: Colors, moved = false) {
    super({
      color,
      key: 'p',
      moveKind: MoveKinds.JUMP,
      moveDeltas: [],
      moved,
      value: Pawn.VALUE,
    })
    if (this.color === Colors.WHITE)
      this.captureDeltas = Pawn.WHITE_CAPTURE_DELTAS
    else this.captureDeltas = Pawn.BLACK_CAPTURE_DELTAS
  }

  public get moved() {
    // need to redefine the accessor
    return this._moved
  }

  private get advanceDeltas() {
    if (this.color === Colors.WHITE) {
      return this.moved ? Pawn.WHITE_MOVE_DELTAS : Pawn.WHITE_START_MOVE_DELTAS
    } else {
      return this.moved ? Pawn.BLACK_MOVE_DELTAS : Pawn.BLACK_START_MOVE_DELTAS
    }
  }

  public set moved(newMovedValue: boolean) {
    this._moved = newMovedValue
    this.moveDeltas = this.advanceDeltas
  }

  public getPseudoMoves(board: Board, from: Tile): Tile[] {
    const moves = []
    for (const [dCol, dRow] of this.moveDeltas) {
      const targetCol = from.col + dCol
      const targetRow = from.row + dRow
      const tileKind = this.classifyTile(board, targetCol, targetRow)
      if (tileKind === TileKinds.EMPTY)
        moves.push(board.tileAt(targetCol, targetRow))
    }
    for (const [dCol, dRow] of this.captureDeltas) {
      const targetCol = from.col + dCol
      const targetRow = from.row + dRow
      const tileKind = this.classifyTile(board, targetCol, targetRow)
      if (tileKind === TileKinds.ENEMY)
        moves.push(board.tileAt(targetCol, targetRow))
    }
    return moves
  }

  public isCaptureSquare(from: Tile, to: Tile): boolean {
    return this.captureDeltas.some(
      ([dCol, dRow]) =>
        from.col + dCol === to.col && from.row + dRow === to.row,
    )
  }

  clone() {
    return new Pawn(this.color, this._moved)
  }
}
