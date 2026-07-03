import { cn, buildPieceAssetUrl } from '#/lib/utils.ts'
import type { Colors, PromotionPieceName } from '@chess-lib/core'
import { PromotionMove } from '@chess-lib/core'
import type { FC } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { Card, CardContent } from './ui/card'

export const PromotionDialog: FC<{
  open: boolean
  color: Colors
  onPieceSelected: (piece: PromotionPieceName) => void
}> = ({ open, color, onPieceSelected }) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Select the piece you want to promote your pawn to:
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div
          className={cn('grid gap-2')}
          style={{
            gridTemplateColumns: `repeat(${Object.keys(PromotionMove.PROMOTION_PIECES).length},1fr)`,
          }}
        >
          {Object.keys(PromotionMove.PROMOTION_PIECES).map((key) => (
            <PromotionCard
              key={`promotion-piece-${key}`}
              color={color}
              pieceName={key as PromotionPieceName}
              onClick={() => onPieceSelected(key as PromotionPieceName)}
            />
          ))}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const PromotionCard: FC<{
  pieceName: PromotionPieceName
  color: Colors
  onClick?: () => void
}> = ({ pieceName, onClick, color }) => {
  return (
    <button
      className="cursor-pointer hover:-translate-y-1 hover:translate-x-0.5 transition-transform"
      type="button"
      onClick={onClick}
    >
      <Card className="shadow-lg">
        <CardContent>
          <img src={buildPieceAssetUrl(color, pieceName)} />
        </CardContent>
      </Card>
    </button>
  )
}
