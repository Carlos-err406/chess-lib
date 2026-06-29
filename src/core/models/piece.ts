import { ASSET_PIECE_BASE_URL, ASSET_STYLE } from '#/components/canvas/conf.ts'
import { Board } from './board'
import type { Tile } from './tile'

export type Color = 'white' | 'black'
export type MoveType = 'slide' | 'jump'
export type MoveDelta = [number, number] // x, y
export type TileKind = 'empty' | 'friendly' | 'enemy' | 'off-board'

export const MOVE_RIGHT: MoveDelta = [1, 0]
export const MOVE_LEFT: MoveDelta = [-1, 0]
export const MOVE_UP: MoveDelta = [0, 1]
export const MOVE_DOWN: MoveDelta = [0, -1]
export const MOVE_DIAG_UP_RIGHT: MoveDelta = [1, 1]
export const MOVE_DIAG_UP_LEFT: MoveDelta = [-1, 1]
export const MOVE_DIAG_DOWN_RIGHT: MoveDelta = [1, -1]
export const MOVE_DIAG_DOWN_LEFT: MoveDelta = [-1, -1]
export const MOVE_L_UP_RIGHT: MoveDelta = [1, 2]
export const MOVE_L_UP_LEFT: MoveDelta = [-1, 2]
export const MOVE_L_DOWN_RIGHT: MoveDelta = [1, -2]
export const MOVE_L_DOWN_LEFT: MoveDelta = [-1, -2]
export const MOVE_L_RIGHT_UP: MoveDelta = [2, 1]
export const MOVE_L_RIGHT_DOWN: MoveDelta = [2, -1]
export const MOVE_L_LEFT_UP: MoveDelta = [-2, 1]
export const MOVE_L_LEFT_DOWN: MoveDelta = [-2, -1]

type PieceConstructorOpts = {
  color: Color
  key: string
  moveType: MoveType
  moveDeltas: MoveDelta[]
  moved?: boolean
}

export abstract class Piece {
  readonly key: string
  readonly assetUrl: string
  readonly moveType: MoveType
  readonly moveDeltas: MoveDelta[]
  moved: boolean
  readonly color: Color

  constructor({
    color,
    key,
    moveType,
    moveDeltas,
    moved = false,
  }: PieceConstructorOpts) {
    this.color = color
    this.moveType = moveType
    this.moveDeltas = moveDeltas
    this.moved = moved
    this.key = color === 'white' ? key.toUpperCase() : key.toLowerCase()
    const assetName = this.constructor.name.toLowerCase()
    const assetColorSuffix = color === 'white' ? 'w' : 'b'
    this.assetUrl = `${ASSET_PIECE_BASE_URL}/${ASSET_STYLE}/${assetName}-${assetColorSuffix}.svg`
  }

  protected classifyTile(board: Board, col: number, row: number): TileKind {
    if (!Board.isOnBoard(col, row)) return 'off-board'
    const piece = board.tileAt(col, row).piece // safe now — bounds already checked
    if (!piece) return 'empty'
    return piece.color === this.color ? 'friendly' : 'enemy'
  }

  public getPseudoMoves(board: Board, from: Tile): Tile[] {
    const moves = []
    for (const [dCol, dRow] of this.moveDeltas) {
      if (this.moveType === 'jump') {
        const targetCol = from.col + dCol
        const targetRow = from.row + dRow
        const tileKind = this.classifyTile(board, targetCol, targetRow)
        if (tileKind === 'empty' || tileKind === 'enemy')
          moves.push(board.tileAt(targetCol, targetRow))
      } else {
        let step = 1
        for (;;) {
          const targetCol = from.col + dCol * step
          const targetRow = from.row + dRow * step
          const tileKind = this.classifyTile(board, targetCol, targetRow)
          if (tileKind === 'off-board' || tileKind === 'friendly') break
          else {
            moves.push(board.tileAt(targetCol, targetRow))
            if (tileKind === 'enemy') break
            step++ // empty tile keep checking
          }
        }
      }
    }
    return moves
  }

  public abstract clone(): Piece
}
