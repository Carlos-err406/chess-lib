import { KBoard } from '#/components/canvas/k-board.tsx'
import { RightPanel } from '#/components/right-panel'
import { GameStatus } from '#/components/status-panel/game-status.tsx'
import { UndoRedoButtons } from '#/components/status-panel/undo-redo-buttons.tsx'
import { createFileRoute } from '@tanstack/react-router'
import Konva from 'konva'

Konva.pixelRatio = 3.125 // increase the dpi

export const Route = createFileRoute('/')({
  component: Home,
})
function Home() {
  return (
    <div className="grid grid-cols-[1fr_120px_1fr] gap-5 p-5 h-svh w-svw overflow-clip">
      <KBoard />
      <div className="flex flex-col gap-3">
        <GameStatus />
        <UndoRedoButtons />
      </div>
      <RightPanel />
    </div>
  )
}
