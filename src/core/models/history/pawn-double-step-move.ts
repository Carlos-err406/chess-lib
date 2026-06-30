import { Tile } from '../board'
import type { TileName } from '../board/tile'
import { GenericMove } from './generic-move'

export class PawnDoubleStepMove extends GenericMove {
  constructor(from: TileName, to: TileName) {
    super(from, to)
  }
  // the square the pawn PASSED OVER — the one an enemy pawn can capture onto
  public override enPassantTarget(): TileName {
    const fromTile = new Tile(this.from)
    const toTile = new Tile(this.to)
    const passedRow = (fromTile.row + toTile.row) / 2 // midpoint of the two-square jump
    return new Tile(toTile.col, passedRow).name
  }
}
