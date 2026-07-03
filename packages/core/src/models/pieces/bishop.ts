import type { Colors, MoveDelta, PieceId } from './piece'
import {
  MOVE_DIAG_DOWN_LEFT,
  MOVE_DIAG_DOWN_RIGHT,
  MOVE_DIAG_UP_LEFT,
  MOVE_DIAG_UP_RIGHT,
  MoveKinds,
  Piece,
} from './piece'

export class Bishop extends Piece {
  public static MOVE_DELTAS: MoveDelta[] = [
    MOVE_DIAG_DOWN_LEFT,
    MOVE_DIAG_DOWN_RIGHT,
    MOVE_DIAG_UP_LEFT,
    MOVE_DIAG_UP_RIGHT,
  ]
  public static readonly VALUE = 3
  public static readonly NAME = 'Bishop'

  constructor(color: Colors, moved = false, id?: PieceId) {
    super({
      color,
      key: 'b',
      moveKind: MoveKinds.SLIDE,
      moveDeltas: Bishop.MOVE_DELTAS,
      moved,
      value: Bishop.VALUE,
      name: Bishop.NAME,
      id,
    })
  }
  clone() {
    return new Bishop(this.color, this._moved)
  }
}
