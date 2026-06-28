import { Piece } from './piece'
import type { Color } from './piece'

export class Bishop extends Piece {
  constructor(color: Color, moved = false) {
    super(color, 'b', moved)
  }
}
