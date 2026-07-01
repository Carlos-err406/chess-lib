import { useSyncExternalStore } from 'react'
import { gameStore } from './game-state.ts'

/**
 * Subscribes the calling component to game state changes and returns the game
 * engine to read from. Re-renders on every move, undo, or redo.
 */
export const useGame = () => {
  useSyncExternalStore(
    gameStore.subscribe,
    gameStore.getSnapshot,
    gameStore.getSnapshot,
  )
  return gameStore.game
}
