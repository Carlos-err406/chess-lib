import { gameStore } from '#/lib/state/game-state.ts'
import { useGame } from '#/lib/state/use-game.ts'
import type { FC } from 'react'

export const UndoRedoButtons: FC<{
  onUndo?: () => void
  onRedo?: () => void
}> = ({ onRedo, onUndo }) => {
  const game = useGame()
  return (
    <>
      <button
        className="border disabled:opacity-50"
        type="button"
        disabled={game.history.length === 0}
        onClick={() => {
          gameStore.undo()
          onUndo?.()
        }}
      >
        Undo
      </button>
      <button
        className="border disabled:opacity-50"
        type="button"
        disabled={game.history.redoStack.length === 0}
        onClick={() => {
          gameStore.redo()
          onRedo?.()
        }}
      >
        Redo
      </button>
    </>
  )
}
