import { useGame } from '#/state/use-game.ts'

export const HistorySection = () => {
  const game = useGame()
  return (
    <div className="flex flex-col">
      <h2>History</h2>
      {game.history.moves.map((move, i) => (
        <p key={`history-move-${i}`}>move {i + 1}: todo</p>
      ))}
    </div>
  )
}
