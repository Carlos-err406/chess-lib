import { useGame } from '#/state/use-game.ts'
import { HistoryMove } from './history-move'

export const HistorySection = () => {
  const game = useGame()

  return (
    <div className="flex flex-col gap-2">
      <h2>History</h2>
      {game.history.redoStack.map((move, i, arr) => (
        <HistoryMove
          key={`redostack-move-${i}`}
          move={move}
          moveNumber={game.history.length + arr.length - i}
          fromRedoStack
        />
      ))}
      {[...game.history.moves].reverse().map((move, i, arr) => (
        <HistoryMove
          key={`history-move-${i}`}
          move={move}
          moveNumber={arr.length - i}
        />
      ))}
    </div>
  )
}
