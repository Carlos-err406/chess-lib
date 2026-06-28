import { Piece } from './piece'
import type { Color } from './piece'

export class Queen extends Piece {
  constructor(color: Color, moved = false) {
    super(color, 'q', moved)
  }
}
