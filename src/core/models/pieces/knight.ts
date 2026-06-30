import type { Colors, MoveDelta } from './piece'
import {
  MOVE_L_DOWN_LEFT,
  MOVE_L_DOWN_RIGHT,
  MOVE_L_LEFT_DOWN,
  MOVE_L_LEFT_UP,
  MOVE_L_RIGHT_DOWN,
  MOVE_L_RIGHT_UP,
  MOVE_L_UP_LEFT,
  MOVE_L_UP_RIGHT,
  MoveKinds,
  Piece,
} from './piece'

export class Knight extends Piece {
  public static MOVE_DELTAS: MoveDelta[] = [
    MOVE_L_DOWN_LEFT,
    MOVE_L_DOWN_RIGHT,
    MOVE_L_LEFT_DOWN,
    MOVE_L_RIGHT_DOWN,
    MOVE_L_UP_LEFT,
    MOVE_L_UP_RIGHT,
    MOVE_L_LEFT_UP,
    MOVE_L_RIGHT_UP,
  ]
  constructor(color: Colors, moved = false) {
    super({
      color,
      key: 'n',
      moveKind: MoveKinds.JUMP,
      moveDeltas: Knight.MOVE_DELTAS,
      moved,
    })
  }
  clone() {
    return new Knight(this.color, this._moved)
  }
}
