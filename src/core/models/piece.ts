export type Color = 'white' | 'black'

export abstract class Piece {
  readonly key: string

  constructor(
    readonly color: Color,
    key: string,
    readonly moved = false,
  ) {
    this.key = color === 'white' ? key.toUpperCase() : key.toLowerCase()
  }
}
