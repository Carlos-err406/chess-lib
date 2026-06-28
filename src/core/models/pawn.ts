import { Piece } from './piece'
import type { Color } from './piece'

export class Pawn extends Piece {
  constructor(color: Color, moved = false) {
    super(color, 'p', moved)
  }
}
