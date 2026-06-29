import { Bishop } from './bishop'
import { King } from './king'
import { Knight } from './knight'
import { Pawn } from './pawn'
import type { Piece } from './piece'
import { Queen } from './queen'
import { Rook } from './rook'
import { Tile } from './tile'

export type Row = (typeof Board.Rows)[number]
export type Col = (typeof Board.Cols)[number]

export class Board {
  private _grid: (Piece | null)[][] = []

  constructor() {
    this.initBoard()
  }
  get grid() {
    return this._grid
  }
  public static readonly Cols = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
  ] as const
  public static readonly Rows = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
  ] as const

  private initBoard() {
    // initialize the grid's dimensions
    this._grid = Array.from({ length: Board.Rows.length }, () =>
      Array.from({ length: Board.Cols.length }, () => null),
    )

    const backRank = [
      Rook,
      Knight,
      Bishop,
      Queen,
      King,
      Bishop,
      Knight,
      Rook,
    ] as const

    const layout = [
      { color: 'white', backRow: '1', pawnRow: '2' },
      { color: 'black', backRow: '8', pawnRow: '7' },
    ] as const

    for (const { color, backRow, pawnRow } of layout) {
      Board.Cols.forEach((column, i) => {
        this.setPieceAtTile(new backRank[i](color), new Tile(column, backRow))
        this.setPieceAtTile(new Pawn(color), new Tile(column, pawnRow))
      })
    }
  }

  private setPieceAtTile(piece: Piece, tile: Tile) {
    this._grid[tile.row][tile.col] = piece
  }

  public pieceAt(tile: Tile) {
    return this._grid[tile.row][tile.col]
  }

  public toString() {
    let boardBuffer = `  ${Board.Cols.join('')}\n`
    for (let i = this._grid.length - 1; i >= 0; i--) {
      let rowBuffer = Board.Rows[i] + ' '
      const row = this._grid[i]
      for (const col of row) {
        rowBuffer += col?.key ?? ' '
      }
      boardBuffer += rowBuffer + '\n'
    }
    return boardBuffer
  }
}
