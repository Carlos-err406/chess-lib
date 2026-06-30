import type { Colors, MoveDelta } from './piece'
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
  constructor(color: Colors, moved = false) {
    super({
      color,
      key: 'r',
      moveKind: MoveKinds.SLIDE,
      moveDeltas: Rook.MOVE_DELTAS,
      moved,
    })
  }

  clone() {
    return new Rook(this.color, this._moved)
  }
}
