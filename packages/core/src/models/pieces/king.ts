import type { Colors, MoveDelta, PieceId } from '../pieces/piece'
import {
  MOVE_DIAG_DOWN_LEFT,
  MOVE_DIAG_DOWN_RIGHT,
  MOVE_DIAG_UP_LEFT,
  MOVE_DIAG_UP_RIGHT,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  MoveKinds,
  Piece,
} from '../pieces/piece'

export class King extends Piece {
  public static MOVE_DELTAS: MoveDelta[] = [
    MOVE_UP,
    MOVE_LEFT,
    MOVE_DOWN,
    MOVE_RIGHT,
    MOVE_DIAG_DOWN_LEFT,
    MOVE_DIAG_DOWN_RIGHT,
    MOVE_DIAG_UP_LEFT,
    MOVE_DIAG_UP_RIGHT,
  ]
  public static readonly VALUE = Infinity
  public static readonly NAME = 'King'
  constructor(color: Colors, moved = false, id?: PieceId) {
    super({
      color,
      key: 'k',
      moveKind: MoveKinds.JUMP,
      moveDeltas: King.MOVE_DELTAS,
      moved,
      value: King.VALUE,
      name: King.NAME,
      id,
    })
  }
  clone() {
    return new King(this.color, this._moved)
  }
}
