import { Board } from '../board'
import type { Tile } from '../board/tile'

export enum Colors {
  WHITE = 'white',
  BLACK = 'black',
}
export enum MoveKinds {
  SLIDE = 'slide',
  JUMP = 'jump',
}
export type MoveDelta = [number, number] // x, y
export enum TileKinds {
  EMPTY,
  FRIENDLY,
  ENEMY,
  OFF_BOARD,
}

export const MOVE_RIGHT: MoveDelta = [1, 0]
export const MOVE_LEFT: MoveDelta = [-1, 0]
export const MOVE_UP: MoveDelta = [0, 1]
export const MOVE_UP2: MoveDelta = [0, 2]
export const MOVE_DOWN: MoveDelta = [0, -1]
export const MOVE_DOWN2: MoveDelta = [0, -2]
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

export type PieceId = number & { __brand: 'PieceId' }
export const pieceId = (id: number): PieceId => id as PieceId

type PieceConstructorOpts = {
  color: Colors
  name: string
  key: string
  moveKind: MoveKinds
  moveDeltas: MoveDelta[]
  moved?: boolean
  value: number
  id?: PieceId
}

export abstract class Piece {
  private static counter: PieceId = pieceId(0)
  readonly id: PieceId // stable identity per physical piece (can be used as a render key)
  readonly key: string
  readonly name: string
  readonly moveKind: MoveKinds
  protected moveDeltas: MoveDelta[]
  protected captureDeltas: MoveDelta[]
  protected _moved!: boolean
  readonly color: Colors
  readonly value: number

  constructor({
    color,
    key,
    moveKind,
    moveDeltas,
    value,
    name,
    moved = false,
    id,
  }: PieceConstructorOpts) {
    this.id = pieceId(id ?? Piece.counter++)
    this.color = color
    this.moveKind = moveKind
    this.moveDeltas = moveDeltas
    this.captureDeltas = moveDeltas
    this.moved = moved
    this.key = color === Colors.WHITE ? key.toUpperCase() : key.toLowerCase()
    this.name = name
    this.value = value
  }

  protected classifyTile(board: Board, col: number, row: number): TileKinds {
    if (!Board.isOnBoard(col, row)) return TileKinds.OFF_BOARD
    const piece = board.tileAt(col, row).piece // safe now — bounds already checked
    if (!piece) return TileKinds.EMPTY
    return piece.color === this.color ? TileKinds.FRIENDLY : TileKinds.ENEMY
  }

  public getPseudoMoves(board: Board, from: Tile): Tile[] {
    const moves: Tile[] = []
    for (const [dCol, dRow] of this.moveDeltas) {
      if (this.moveKind === MoveKinds.JUMP) {
        const targetCol = from.col + dCol
        const targetRow = from.row + dRow
        const tileKind = this.classifyTile(board, targetCol, targetRow)
        if (tileKind === TileKinds.EMPTY || tileKind === TileKinds.ENEMY)
          moves.push(board.tileAt(targetCol, targetRow))
      } else {
        let step = 1
        for (;;) {
          const targetCol = from.col + dCol * step
          const targetRow = from.row + dRow * step
          const tileKind = this.classifyTile(board, targetCol, targetRow)
          if (
            tileKind === TileKinds.OFF_BOARD ||
            tileKind === TileKinds.FRIENDLY
          )
            break
          else {
            moves.push(board.tileAt(targetCol, targetRow))
            if (tileKind === TileKinds.ENEMY) break
            step++ // empty tile keep checking
          }
        }
      }
    }
    return moves
  }

  public get moved() {
    return this._moved
  }

  public set moved(value: boolean) {
    this._moved = value
  }

  public abstract clone(): Piece

  public toString() {
    return this.key
  }
}
