import { Colors } from '@chess-lib/core'
import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ASSET_PIECE_BASE_URL, ASSET_STYLE } from './conf'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildPieceAssetUrl(color: Colors, name: string): string {
  const colorSuffix = color === Colors.WHITE ? 'w' : 'b'
  return `${ASSET_PIECE_BASE_URL}/${ASSET_STYLE}/${name.toLowerCase()}-${colorSuffix}.svg`
}
