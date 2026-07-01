import { GameStatusKinds } from '#/core/models/game';
import { useGame } from '#/state/use-game.ts';
import type { FC } from 'react';

export const GameStatus: FC = () => {
  const game = useGame()
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
