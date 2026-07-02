import { TileShade } from '#/core/models/board/tile.ts'
import Konva from 'konva'

export const TILE_SIZE = 90
export const TILE_STROKE_COLOR = '#666'
export const TILE_HIGHLIGHTED_LEGAL_MOVE_COLOR = (attack = false) =>
  attack ? 'red' : '#00f'
export const TILE_HIGHLIGHTED_CHECK_COLOR = 'red'
export const TILE_HOVER_STROKE_WIDTH = 2
export const TILE_COLOR = {
  [TileShade.LIGHT]: '#fff',
  [TileShade.DARK]: '#999',
}

export const ASSET_STYLE = 'default'
export const ASSET_PIECE_BASE_URL = '/assets/pieces'

export const PIECE_MOVE_DURATION = 0.3 // seconds, straight-line slide
export const PIECE_MOVE_EASING = Konva.Easings.BackEaseOut
