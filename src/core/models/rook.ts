import { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, Piece } from './piece'
import type { Color, MoveDelta } from './piece'

export const ROOK_DIRS: MoveDelta[] = [
  MOVE_UP,
  MOVE_DOWN,
  MOVE_RIGHT,
  MOVE_LEFT,
]

export class Rook extends Piece {
  constructor(color: Color, moved = false) {
    super({ color, key: 'r', moveType: 'slide', moveDeltas: ROOK_DIRS, moved })
  }

  clone() {
    return new Rook(this.color, this.moved)
  }
}
