import { Piece } from './piece'
import type { Color } from './piece'

export class Knight extends Piece {
  constructor(color: Color, moved = false) {
    super(color, 'n', moved)
  }
}
