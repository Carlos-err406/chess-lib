import type { Board, TileName } from '../board'
import type { Colors } from '../pieces'

export abstract class Move {
  abstract apply(board: Board): void
  abstract undo(board: Board): void

  abstract get metadata(): {
    from: TileName
    to: TileName
    movedPieceColor: Colors
    movedPieceAsset: string
    movedPieceName: string
    capturedPieceColor?: Colors
    capturedPieceAsset?: string
    capturedPieceName?: string
    capturedPieceValue?: number
  }[]

  public enPassantTarget(): TileName | null {
    return null
  }
}
