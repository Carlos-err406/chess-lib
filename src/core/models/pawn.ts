import { MOVE_UP, Piece } from './piece'
import type { Color, MoveDelta } from './piece'

export const PAWN_JUMPS: MoveDelta[] = [MOVE_UP]

export class Pawn extends Piece {
  constructor(color: Color, moved = false) {
    super({ color, key: 'p', moveType: 'jump', moveDeltas: PAWN_JUMPS, moved })
  }

  clone() {
    return new Pawn(this.color, this.moved)
  }
}
