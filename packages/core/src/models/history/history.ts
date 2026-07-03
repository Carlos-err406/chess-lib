import type { Board } from '../board'
import type { Move } from './move'

export class History {
  constructor(
    public moves: Move[] = [],
    public redoStack: Move[] = [],
  ) {}

  push(move: Move) {
    this.moves.push(move)
    this.redoStack = []
  }

  undo(board: Board) {
    const move = this.moves.pop()
    if (move) {
      move.undo(board)
      this.redoStack.push(move)
    }
    return move
  }
  redo(board: Board) {
    const move = this.redoStack.pop()
    if (move) {
      move.apply(board)
      this.moves.push(move)
    }
    return move
  }

  get length() {
    return this.moves.length
  }

  get last() {
    return this.moves.at(-1)
  }
}
