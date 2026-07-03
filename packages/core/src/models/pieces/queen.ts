import type { Colors, MoveDelta, PieceId } from './piece'
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
} from './piece'

export class Queen extends Piece {
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
  public static readonly VALUE = 9
  public static readonly NAME = 'Queen'

  constructor(color: Colors, moved = false, id?: PieceId) {
    super({
      color,
      key: 'q',
      moveKind: MoveKinds.SLIDE,
      moveDeltas: Queen.MOVE_DELTAS,
      moved,
      value: Queen.VALUE,
      name: Queen.NAME,
      id,
    })
  }

  clone() {
    return new Queen(this.color, this._moved)
  }
}
