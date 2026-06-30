import type { TileName } from '../board/tile'
import { Tile } from '../board/tile'
import type { Piece } from '../pieces'
import { Bishop, Colors, King, Knight, Pawn, Queen, Rook } from '../pieces'

export type Row = (typeof Board.Rows)[number]
export type Col = (typeof Board.Cols)[number]

export class Board {
  private grid: Tile[][] = []
  public static readonly WHITE_BACK_RANK: Row = '1'
  public static readonly BLACK_BACK_RANK: Row = '8'

  constructor(board?: Board) {
    if (!board) {
      this.initBoard()
      return
    }
    this.initEmpty()
    for (let i = 0; i < Board.Rows.length; i++) {
      for (let j = 0; j < Board.Cols.length; j++) {
        this.grid[i][j] = new Tile(board.grid[i][j])
      }
    }
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
  private initEmpty() {
    // initialize the grid's dimensions
    this.grid = Array.from({ length: Board.Rows.length }, (_row, i) =>
      Array.from({ length: Board.Cols.length }, (_col, j) => new Tile(j, i)),
    )
  }
  private initBoard() {
    this.initEmpty()
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
      { color: Colors.WHITE, backRow: '1', pawnRow: '2' },
      { color: Colors.BLACK, backRow: '8', pawnRow: '7' },
    ] as const

    for (const { color, backRow, pawnRow } of layout) {
      Board.Cols.forEach((colName, c) => {
        const back = new Tile(colName, backRow)
        const pawn = new Tile(colName, pawnRow)
        this.grid[back.row][back.col].setPiece(new backRank[c](color))
        this.grid[pawn.row][pawn.col].setPiece(new Pawn(color))
      })
    }
  }
  public tileAt(col: number, row: number): Tile {
    return this.grid[row][col]
  }
  public tileAtParts(col: Col, row: Row): Tile {
    const t = new Tile(col, row)
    return this.grid[t.row][t.col]
  }
  public tileAtName(name: TileName): Tile {
    const t = new Tile(name)
    return this.grid[t.row][t.col]
  }
  public placePiece(piece: Piece | null, at: TileName): void {
    const t = new Tile(at)
    this.grid[t.row][t.col].setPiece(piece)
  }
  public static isOnBoard(col: number, row: number): boolean {
    return (
      col >= 0 && col < Board.Cols.length && row >= 0 && row < Board.Rows.length
    )
  }
  public move(from: TileName, to: TileName) {
    const fromTile = this.tileAtName(from)
    const toTile = this.tileAtName(to)
    const fromPiece = fromTile.piece
    if (!fromPiece) return undefined
    const captured = toTile.piece
    toTile.setPiece(fromPiece)
    fromTile.setPiece(null)
    const flippedMovedFlag = fromPiece.moved === false
    fromPiece.moved = true
    return { captured, flippedMovedFlag, movedPiece: fromPiece }
  }
  public getKingTile<T extends boolean = false>(
    color: Colors,
    simulation: T = false as T,
  ): T extends true ? Tile | undefined : Tile {
    for (const row of this.grid)
      for (const tile of row)
        if (tile.piece instanceof King && tile.piece.color === color)
          return tile

    if (!simulation)
      throw new Error(`Invalid game state: ${color} king not on board`)
    return undefined as T extends true ? Tile | undefined : Tile
  }

  public getPlayerTiles(color: Colors) {
    const tiles: Tile[] = []
    for (const row of this.grid) {
      for (const tile of row) {
        if (tile.piece?.color === color) tiles.push(tile)
      }
    }
    return tiles
  }

  public getTilesWithPieces() {
    const tiles: Tile[] = []
    for (const row of this.grid) {
      for (const tile of row) {
        if (tile.piece) tiles.push(tile)
      }
    }
    return tiles
  }

  public clear() {
    this.initEmpty()
  }

  public toString() {
    let boardBuffer = `  ${Board.Cols.join('')}\n`
    for (let i = this.grid.length - 1; i >= 0; i--) {
      let rowBuffer = Board.Rows[i] + ' '
      const row = this.grid[i]
      for (const tile of row) {
        rowBuffer += tile.piece?.key ?? ' '
      }
      boardBuffer += rowBuffer + '\n'
    }
    return boardBuffer
  }

  public static isBackRank(tile: Tile, color: Colors): boolean {
    if (color === Colors.WHITE) return tile.rowName === Board.WHITE_BACK_RANK
    else return tile.rowName === Board.BLACK_BACK_RANK
  }
  /** opposite of Board.isBackRank based on the color */
  public static isPromotionRank(tile: Tile, color: Colors): boolean {
    if (color === Colors.WHITE) return tile.rowName === Board.BLACK_BACK_RANK
    else return tile.rowName === Board.WHITE_BACK_RANK
  }
}
