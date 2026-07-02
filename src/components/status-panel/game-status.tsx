import { GameStatusKinds } from '#/core/models/game'
import { useGame } from '#/lib/state/use-game.ts'
import type { FC } from 'react'
import { useEffect } from 'react'
import { useCelebrate } from '../confetti/confetti-provider'

export const GameStatus: FC = () => {
  const game = useGame()
  const celebrate = useCelebrate()
  useEffect(() => {
    if (
      [
        GameStatusKinds.BLACK_WIN,
        GameStatusKinds.WHITE_WIN,
        GameStatusKinds.STALEMATE,
      ].includes(game.status)
    ) {
      celebrate()
    }
  }, [game.status, celebrate])
  return (
    <p className="text-center">
      {game.status === GameStatusKinds.ONGOING ? (
        <>
          <span className="capitalize">{game.turnColor.toString()}</span>
          <span>'s turn</span>
        </>
      ) : (
        <span className="capitalize">{game.status.toString()}</span>
      )}
    </p>
  )
}
