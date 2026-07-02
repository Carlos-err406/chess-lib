import { gameStore } from '#/lib/state/game-state.ts'
import { useGame } from '#/lib/state/use-game.ts'
import type { FC } from 'react'

export const UndoRedoButtons: FC = () => {
  const game = useGame()
  return (
    <>
      <button
        className="border disabled:opacity-50"
        type="button"
        disabled={game.history.length === 0}
        onClick={() => gameStore.undo()}
      >
        Undo
      </button>
      <button
        className="border disabled:opacity-50"
        type="button"
        disabled={game.history.redoStack.length === 0}
        onClick={() => gameStore.redo()}
      >
        Redo
      </button>
    </>
  )
}
