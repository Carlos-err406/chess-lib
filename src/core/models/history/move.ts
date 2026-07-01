import type { Board, TileName } from '../board'

export abstract class Move {
  abstract apply(board: Board): void
  abstract undo(board: Board): void

  abstract get metadata(): {
    from: TileName
    to: TileName
    pieceAsset: string
  }[]

  public enPassantTarget(): TileName | null {
    return null
  }
}
