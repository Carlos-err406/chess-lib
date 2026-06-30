import type { Board } from '../board'
import { Move } from './move'

export class BatchMove extends Move {
  constructor(private moves: Move[]) {
    super()
  }
  apply(board: Board) {
    for (const m of this.moves) {
      m.apply(board)
    }
  }
  undo(board: Board) {
    for (let i = this.moves.length - 1; i >= 0; i--) {
      this.moves[i].undo(board)
    }
  }
}
