import type { Colors, MoveDelta } from '../pieces/piece'
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
  constructor(color: Colors, moved = false) {
    super({
      color,
      key: 'k',
      moveKind: MoveKinds.JUMP,
      moveDeltas: King.MOVE_DELTAS,
      moved,
    })
  }
  clone() {
    return new King(this.color, this._moved)
  }
}
