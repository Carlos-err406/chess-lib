import { TileShade } from '@chess-lib/core'
import Konva from 'konva'

export const TILE_SIZE = 90
export const TILE_STROKE_COLOR = '#666'
export const TILE_HIGHLIGHTED_LEGAL_MOVE_COLOR = (capture = false) =>
  capture ? '#f00' : '#00f'
export const TILE_HOVER_STROKE_WIDTH = 2
export const TILE_COLOR = {
  [TileShade.LIGHT]: '#fff',
  [TileShade.DARK]: '#999',
}

export const PIECE_MOVE_DURATION = 0.3 // seconds, straight-line slide
export const PIECE_MOVE_EASING = Konva.Easings.BackEaseOut

export const ASSET_STYLE = 'default'
export const ASSET_PIECE_BASE_URL = '/assets/pieces'
