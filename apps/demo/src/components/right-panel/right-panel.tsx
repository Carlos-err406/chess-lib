import { Colors } from '@chess-lib/core'
import { useGame } from '@chess-lib/react-hooks'
import type { FC } from 'react'
import { CapturesSection } from './captures-section'
import { HistorySection } from './history-section'
import { buildPieceAssetUrl } from '#/lib/utils.ts'

export const RightPanel: FC = () => {
  const game = useGame()

  const { black: blackMaterial, white: whiteMaterial } = game.getMaterial()
  const blackMaterialDiff = blackMaterial.material - whiteMaterial.material
  const whiteMaterialDiff = whiteMaterial.material - blackMaterial.material
  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full h-full bg-black p-0.5 gap-0.5  max-h-[calc(100svh-40px)] [&>div]:bg-background">
      <div className="row-span-full overflow-auto h-full p-1">
        <HistorySection />
      </div>
      <div className="size-full p-1">
        Black {blackMaterialDiff > 0 && `+${Math.abs(blackMaterialDiff)}`}
        <CapturesSection
          assets={blackMaterial.pieceNames.map((name) =>
            buildPieceAssetUrl(Colors.WHITE, name),
          )}
          material={blackMaterial.material}
        />
      </div>
      <div className="size-full p-1">
        White {whiteMaterialDiff > 0 && `+${Math.abs(whiteMaterialDiff)}`}
        <CapturesSection
          assets={whiteMaterial.pieceNames.map((name) =>
            buildPieceAssetUrl(Colors.BLACK, name),
          )}
          material={whiteMaterial.material}
        />
      </div>
    </div>
  )
}
