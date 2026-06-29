import {
  MOVE_DIAG_DOWN_LEFT,
  MOVE_DIAG_DOWN_RIGHT,
  MOVE_DIAG_UP_LEFT,
  MOVE_DIAG_UP_RIGHT,
  Piece,
} from './piece'
import type { Color, MoveDelta } from './piece'

export const BISHOP_DIRS: MoveDelta[] = [
  MOVE_DIAG_DOWN_LEFT,
  MOVE_DIAG_DOWN_RIGHT,
  MOVE_DIAG_UP_LEFT,
  MOVE_DIAG_UP_RIGHT,
]

export class Bishop extends Piece {
  constructor(color: Color, moved = false) {
    super({
      color,
      key: 'b',
      moveType: 'slide',
      moveDeltas: BISHOP_DIRS,
      moved,
    })
  }
  clone() {
    return new Bishop(this.color, this.moved)
  }
}
