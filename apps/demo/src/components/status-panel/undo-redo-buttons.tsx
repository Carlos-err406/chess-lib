import { gameStore, useGame } from '@chess-lib/react-hooks'
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
