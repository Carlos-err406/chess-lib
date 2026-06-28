import { Piece } from './piece'
import type { Color } from './piece'

export class King extends Piece {
  constructor(color: Color, moved = false) {
    super(color, 'k', moved)
  }
}
