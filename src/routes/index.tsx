import { TILE_SIZE } from '#/components/canvas/conf.ts'
import { KBoard } from '#/components/canvas/k-board.tsx'
import { RightPanel } from '#/components/right-panel'
import { gameStore } from '#/state/game-state.ts'
import { useGame } from '#/state/use-game.ts'
import { createFileRoute } from '@tanstack/react-router'
import Konva from 'konva'
import { Stage } from 'react-konva'

Konva.pixelRatio = 3 // increase the dpi

export const Route = createFileRoute('/')({
  component: Home,
  pendingComponent: () => null,
})
function Home() {
  const game = useGame()

  return (
    <div className="grid grid-cols-[1fr_120px_1fr] gap-5 p-5 h-svh w-svw overflow-clip">
      <Stage
        height={TILE_SIZE * 9}
        width={TILE_SIZE * 9}
        className="shadow-[0_0_10px_10px_#0000001a]"
      >
        <KBoard />
      </Stage>
      <div className="flex flex-col gap-3">
        <p>
          <span className="capitalize">{game.turnColor.toString()}</span>'s turn
        </p>
        <button
          className="border"
          type="button"
          onClick={() => gameStore.undo()}
        >
          Undo
        </button>
        <button
          className="border"
          type="button"
          onClick={() => gameStore.redo()}
        >
          Redo
        </button>
      </div>
      <RightPanel />
    </div>
  )
}
