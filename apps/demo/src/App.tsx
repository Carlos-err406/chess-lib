import Konva from 'konva'
import { KBoard } from '#/components/canvas/k-board.tsx'
import { ConfettiProvider } from '#/components/confetti/confetti-provider.tsx'
import { RightPanel } from '#/components/right-panel'
import { GameStatus } from '#/components/status-panel/game-status.tsx'
import { UndoRedoButtons } from '#/components/status-panel/undo-redo-buttons.tsx'

Konva.pixelRatio = 3.125 // increase the dpi

export function App() {
  return (
    <ConfettiProvider>
      <div className="flex min-h-svh w-full flex-col gap-4 p-4 lg:grid lg:h-svh lg:min-h-0 lg:grid-cols-[1fr_150px_450px] lg:gap-5 lg:overflow-hidden">
        {/* Board — square on mobile, fills the row height on desktop */}
        <div className="aspect-square w-full min-h-0 min-w-0 lg:aspect-auto lg:h-full">
          <KBoard />
        </div>

        {/* Status + controls */}
        <div className="flex flex-col gap-3">
          <GameStatus />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            <UndoRedoButtons />
          </div>
        </div>

        {/* Move history + captured material */}
        <div className="h-[60svh] min-h-0 lg:h-full">
          <RightPanel />
        </div>
      </div>
    </ConfettiProvider>
  )
}
