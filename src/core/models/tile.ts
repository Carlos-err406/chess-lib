import type { Col, Row } from './board'
import { Board } from './board'

export type TileName = `${Col}${Row}`
export type TileShade = 'light' | 'dark'

export class Tile {
  public readonly row: number
  public readonly col: number
  public readonly rowName: Row
  public readonly colName: Col
  public readonly name: TileName
  public readonly shade: TileShade

  constructor(col: Col, row: Row)
  constructor(col: number, row: number)
  constructor(pos: TileName)
  constructor(colOrName: Col | TileName | number, row?: Row | number) {
    if (typeof colOrName === 'number') {
      // (col, row) as grid indices
      this.col = colOrName
      this.row = row as number
    } else if (row !== undefined) {
      // (col: Col, row: Row)
      this.col = Board.Cols.indexOf(colOrName as Col)
      this.row = typeof row === 'string' ? Board.Rows.indexOf(row) : row
    } else {
      // (pos: TileName), e.g. "A1"
      const [colName, rowName] = colOrName.split('') as [Col, Row]
      this.col = Board.Cols.indexOf(colName)
      this.row = Board.Rows.indexOf(rowName)
    }

    this.rowName = Board.Rows[this.row]
    this.colName = Board.Cols[this.col]
    this.name = `${this.colName}${this.rowName}`
    this.shade = (this.row + this.col) % 2 ? 'light' : 'dark'
  }
}
