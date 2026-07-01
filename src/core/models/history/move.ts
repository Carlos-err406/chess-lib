import type { Board, TileName } from '../board';
import type { Colors } from '../pieces';
import type { PromotionMove } from './promotion-move';

export abstract class Move {
  abstract apply(board: Board): void
  abstract undo(board: Board): void
  constructor(
    protected from: TileName,
    protected to: TileName,
  ) {}

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
    promotedTo?: keyof typeof PromotionMove.PROMOTION_PIECES
  }[]

  public enPassantTarget(): TileName | null {
    return null
  }
}
