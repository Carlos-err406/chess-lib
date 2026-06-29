import { ASSET_PIECE_BASE_URL, ASSET_STYLE } from '#/components/canvas/conf.ts';

export type Color = 'white' | 'black'

export abstract class Piece {
  readonly key: string
  readonly assetUrl: string
  constructor(
    readonly color: Color,
    key: string,
    readonly moved = false,
  ) {
    this.key = color === 'white' ? key.toUpperCase() : key.toLowerCase()
    const assetName = this.constructor.name.toLowerCase()
    const assetColorSuffix = color == 'white' ? 'w' : 'b'
    this.assetUrl = `${ASSET_PIECE_BASE_URL}/${ASSET_STYLE}/${assetName}-${assetColorSuffix}.svg`
  }
}
