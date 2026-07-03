import type { Colors, MoveDelta, PieceId } from './piece'
import {
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  MoveKinds,
  Piece,
} from './piece'

export class Rook extends Piece {
  public static MOVE_DELTAS: MoveDelta[] = [
    MOVE_UP,
    MOVE_DOWN,
    MOVE_RIGHT,
    MOVE_LEFT,
  ]
  public static readonly VALUE = 5
  public static readonly NAME = 'Rook'

  constructor(color: Colors, moved = false, id?: PieceId) {
    super({
      color,
      key: 'r',
      moveKind: MoveKinds.SLIDE,
      moveDeltas: Rook.MOVE_DELTAS,
      moved,
      value: Rook.VALUE,
      name: Rook.NAME,
      id,
    })
  }

  clone() {
    return new Rook(this.color, this._moved)
  }
}
