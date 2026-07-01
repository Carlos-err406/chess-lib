import type { Move } from '#/core/models/history/index.ts'
import { Piece } from '#/core/models/pieces/index.ts'
import type { FC } from 'react'

export const HistoryMove: FC<{
  moveNumber: number
  move: Move
  fromRedoStack?: boolean
}> = ({ moveNumber, move, fromRedoStack }) => {
  const mn = String(moveNumber).padStart(3, '0')
  const renderPieceAsset = (asset: string) => {
    return <img src={asset} width={30} height={30} className="mb-1" />
  }
  return (
    <div
      className="flex items-center justify-start"
      style={{ opacity: fromRedoStack ? 0.5 : 1 }}
    >
      <span>{mn}:</span>
      <div className="flex items-center justify-center flex-col">
        {move.metadata.map((meta, i) => (
          <div key={`history-move-${mn}${i}`} className="flex items-center">
            {renderPieceAsset(meta.movedPieceAsset)}
            <span>
              {meta.from} {'->'} {meta.to}
            </span>
            {meta.promotedTo &&
              renderPieceAsset(
                Piece.getAssetUrl(meta.movedPieceColor, meta.promotedTo),
              )}
          </div>
        ))}
      </div>
    </div>
  )
}
