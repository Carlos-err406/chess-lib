import { Colors } from '#/core/models/pieces/index.ts'
import { useGame } from '#/state/use-game.ts'
import type { FC } from 'react'
import { CapturesSection } from './captures-section'
import { HistorySection } from './history-section'

export const RightPanel: FC = () => {
  const game = useGame()
  const capturedAssets = game.getCapturedAssets()
  const { black: blackMaterial, white: whiteMaterial } = game.getMaterial()
  const blackMaterialDiff = blackMaterial - whiteMaterial
  const whiteMaterialDiff = whiteMaterial - blackMaterial
  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full h-full bg-black p-0.5 gap-0.5  max-h-[calc(100svh-40px)] [&>div]:bg-background">
      <div className="row-span-full overflow-auto h-full p-1">
        <HistorySection />
      </div>
      <div className="size-full p-1">
        Black {blackMaterialDiff > 0 && `+${Math.abs(blackMaterialDiff)}`}
        <CapturesSection
          assets={capturedAssets[Colors.BLACK]}
          material={blackMaterial}
        />
      </div>
      <div className="size-full p-1">
        White {whiteMaterialDiff > 0 && `+${Math.abs(whiteMaterialDiff)}`}
        <CapturesSection
          assets={capturedAssets[Colors.WHITE]}
          material={whiteMaterial}
        />
      </div>
    </div>
  )
}
