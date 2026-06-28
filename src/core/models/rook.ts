import { Piece } from './piece'
import type { Color } from './piece'

export class Rook extends Piece {
  constructor(color: Color, moved = false) {
    super(color, 'r', moved)
  }
}
