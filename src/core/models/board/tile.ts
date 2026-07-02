import type { Piece } from '../pieces'
import type { Col, Row } from './board'
import { Board } from './board'

export type TileName = `${Col}${Row}`
export enum TileShade {
  LIGHT,
  DARK,
}

export class Tile {
  public readonly row: number
  public readonly col: number
  public readonly rowName: Row
  public readonly colName: Col
  public readonly name: TileName
  public readonly shade: TileShade
  public piece: Piece | null = null

  constructor(tile: Tile)
  constructor(col: Col, row: Row)
  constructor(col: number, row: number)
  constructor(pos: TileName)
  constructor(
    colNameIndexOrTile: Col | TileName | number | Tile,
    row?: Row | number,
  ) {
    if (colNameIndexOrTile instanceof Tile) {
      this.row = colNameIndexOrTile.row
      this.col = colNameIndexOrTile.col
      this.piece = colNameIndexOrTile.piece?.clone() ?? null
    } else if (typeof colNameIndexOrTile === 'number') {
      const [_col, _row] = Tile.getIndicesFromNumbers(
        colNameIndexOrTile,
        row as number,
      )
      this.col = _col
      this.row = _row
    } else if (typeof row === 'string') {
      const [_col, _row] = Tile.getIndicesFromParts(
        colNameIndexOrTile as Col,
        row,
      )
      this.col = _col
      this.row = _row
    } else {
      const [_col, _row] = Tile.getIndicesFromTileName(
        colNameIndexOrTile as TileName,
      )
      this.col = _col
      this.row = _row
    }

    this.rowName = Board.Rows[this.row]
    this.colName = Board.Cols[this.col]
    this.name = `${this.colName}${this.rowName}`
    this.shade = (this.row + this.col) % 2 ? TileShade.LIGHT : TileShade.DARK
  }

  public setPiece(piece: Piece | null) {
    this.piece = piece
  }

  private static getIndicesFromTileName(tileName: TileName): [number, number] {
    const [colName, rowName] = tileName.split('') as [Col, Row]
    const _col = Board.Cols.indexOf(colName)
    const _row = Board.Rows.indexOf(rowName)
    if (_col === -1 || _row === -1) {
      throw new Error(`Invalid tile coordinates (col:${_col}, row: ${_row})`)
    }
    return [_col, _row]
  }

  private static getIndicesFromParts(col: Col, row: Row): [number, number] {
    // (col: Col, row: Row) -- e.g col: "A", row: "1"
    const _col = Board.Cols.indexOf(col)
    const _row = Board.Rows.indexOf(row)
    if (_col === -1 || _row === -1) {
      throw new Error(`Invalid tile coordinates (col:${_col}, row: ${_row})`)
    }
    return [_col, _row]
  }

  private static getIndicesFromNumbers(
    col: number,
    row: number,
  ): [number, number] {
    if (
      col < 0 ||
      col >= Board.Cols.length ||
      row < 0 ||
      row >= Board.Rows.length
    ) {
      throw new Error(`Invalid tile coordinates (col:${col}, row: ${row})`)
    }
    return [col, row]
  }
  public toString() {
    return this.name
  }
}

export class PieceTile extends Tile {
  declare public piece: Piece
  constructor(tile: Tile, piece: Piece) {
    super(tile)
    this.piece = piece
  }
}
