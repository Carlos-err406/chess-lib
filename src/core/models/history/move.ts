import type { Board } from '../board'

export abstract class Move {
  abstract apply(board: Board): void
  abstract undo(board: Board): void
}
