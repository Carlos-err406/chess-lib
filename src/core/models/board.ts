import { Bishop } from './bishop'
import { King } from './king'
import { Knight } from './knight'
import { Pawn } from './pawn'
import type { Color, Piece } from './piece'
import { Queen } from './queen'
import { Rook } from './rook'

export type Square =
  `${(typeof Board.BoardColumns)[number]}${(typeof Board.BoardRows)[number]}`

export class Board {
  private grid: (Piece | null)[][] = []

  public static readonly BoardColumns = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
  ] as const
  public static readonly BoardRows = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
  ] as const

  constructor() {
    this.initBoard()
  }

  private initBoard() {
    this.grid = Array.from({ length: Board.BoardRows.length }, () =>
      Array.from({ length: Board.BoardColumns.length }, () => null),
    )

    const mapping = {
      pawn: (color: Color) => new Pawn(color),
      bishop: (color: Color) => new Bishop(color),
      king: (color: Color) => new King(color),
      knight: (color: Color) => new Knight(color),
      rook: (color: Color) => new Rook(color),
      queen: (color: Color) => new Queen(color),
    } as const

    const scaffolding: {
      [x in keyof typeof mapping]: { [y in Color]: Square[] }
    } = {
      pawn: {
        white: ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2'],
        black: ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7'],
      },
      rook: { white: ['A1', 'H1'], black: ['A8', 'H8'] },
      knight: { white: ['B1', 'G1'], black: ['B8', 'G8'] },
      bishop: { white: ['C1', 'F1'], black: ['C8', 'F8'] },
      queen: { white: ['D1'], black: ['D8'] },
      king: { white: ['E1'], black: ['E8'] },
    }
    Object.entries(scaffolding).forEach(([pieceKey, { black, white }]) => {
      black.forEach((sq) =>
        this.setPieceAtSquare(
          mapping[pieceKey as keyof typeof mapping]('black'),
          sq,
        ),
      )
      white.forEach((sq) =>
        this.setPieceAtSquare(
          mapping[pieceKey as keyof typeof mapping]('white'),
          sq,
        ),
      )
    })
  }

  private setPieceAtSquare(piece: Piece, sq: Square) {
    const { rowIndex, colIndex } = Board.getBoardPositionIndices(sq)
    this.grid[rowIndex][colIndex] = piece
  }

  public static getBoardPositionIndices(sq: Square) {
    const [col, row] = sq.split('') as [
      (typeof Board.BoardColumns)[number],
      (typeof Board.BoardRows)[number],
    ]
    return {
      colIndex: Board.BoardColumns.indexOf(col),
      rowIndex: Board.BoardRows.indexOf(row),
    }
  }
  public pieceAt(sq: Square) {
    const { rowIndex, colIndex } = Board.getBoardPositionIndices(sq)
    return this.grid[rowIndex][colIndex]
  }

  public toString() {
    let boardBuffer = ''
    for (let i = this.grid.length - 1; i >= 0; i--) {
      const row = this.grid[i]
      let rowBuffer = ''
      for (const col of row) {
        rowBuffer += col?.key ?? ' '
      }
      boardBuffer += rowBuffer + '\n'
    }
    return boardBuffer
  }
}
