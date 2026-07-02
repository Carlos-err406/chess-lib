import { Game } from '#/core/models/game.ts';

const game = new Game()

let version = 0
const listeners = new Set<() => void>()

const emit = () => {
  version++
  listeners.forEach((l) => l())
}

/**
 * Reactive wrapper around the pure `Game` engine. Components read state through
 * `game` (via the `useGame` hook) and mutate it through the action wrappers,
 * which notify subscribers so React can re-render. The engine itself stays
 * unaware of React.
 */
export const gameStore = {
  game,

  subscribe: (listener: () => void) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },

  // A monotonic counter is a stable snapshot between changes, so
  // useSyncExternalStore won't loop; it flips on every mutation.
  getSnapshot: () => version,

  tryMove: (...args: Parameters<typeof game.tryMove>) => {
    game.tryMove(...args)
    emit()
  },

  undo: () => {
    const move = game.undo()
    if (move) emit()
    return move
  },

  redo: () => {
    const move = game.redo()
    if (move) emit()
    return move
  },
}
