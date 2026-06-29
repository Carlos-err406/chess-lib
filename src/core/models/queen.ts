import {
  MOVE_DIAG_DOWN_LEFT,
  MOVE_DIAG_DOWN_RIGHT,
  MOVE_DIAG_UP_LEFT,
  MOVE_DIAG_UP_RIGHT,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  Piece,
} from './piece'
import type { Color, MoveDelta } from './piece'

export const QUEEN_DIRS: MoveDelta[] = [
  MOVE_UP,
  MOVE_LEFT,
  MOVE_DOWN,
  MOVE_RIGHT,
  MOVE_DIAG_DOWN_LEFT,
  MOVE_DIAG_DOWN_RIGHT,
  MOVE_DIAG_UP_LEFT,
  MOVE_DIAG_UP_RIGHT,
]
export class Queen extends Piece {
  constructor(color: Color, moved = false) {
    super({ color, key: 'q', moveType: 'slide', moveDeltas: QUEEN_DIRS, moved })
  }

  clone() {
    return new Queen(this.color, this.moved)
  }
}
