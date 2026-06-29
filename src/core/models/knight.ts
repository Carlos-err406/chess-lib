import {
  MOVE_L_DOWN_LEFT,
  MOVE_L_DOWN_RIGHT,
  MOVE_L_LEFT_DOWN,
  MOVE_L_LEFT_UP,
  MOVE_L_RIGHT_DOWN,
  MOVE_L_RIGHT_UP,
  MOVE_L_UP_LEFT,
  MOVE_L_UP_RIGHT,
  Piece,
} from './piece'
import type { Color, MoveDelta } from './piece'

export const KNIGHT_OFFSETS: MoveDelta[] = [
  MOVE_L_DOWN_LEFT,
  MOVE_L_DOWN_RIGHT,
  MOVE_L_LEFT_DOWN,
  MOVE_L_RIGHT_DOWN,
  MOVE_L_UP_LEFT,
  MOVE_L_UP_RIGHT,
  MOVE_L_LEFT_UP,
  MOVE_L_RIGHT_UP,
]
export class Knight extends Piece {
  constructor(color: Color, moved = false) {
    super({
      color,
      key: 'n',
      moveType: 'jump',
      moveDeltas: KNIGHT_OFFSETS,
      moved,
    })
  }
  clone() {
    return new Knight(this.color, this.moved)
  }
}
