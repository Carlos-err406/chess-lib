# @chess-lib/react-hooks

> React hooks and a reactive store that bind [`@chess-lib/core`](https://www.npmjs.com/package/@chess-lib/core) to a React UI.

A thin reactive layer over the pure chess engine, built on `useSyncExternalStore`. The engine stays completely unaware of React — these hooks just subscribe your components to it and expose the interaction state you need to render a board. Part of the [chess-lib](https://github.com/Carlos-err406/chess-lib) monorepo.

## Install

```bash
npm install @chess-lib/react-hooks @chess-lib/core
# or: pnpm add @chess-lib/react-hooks @chess-lib/core
```

`@chess-lib/core` is a dependency and React ≥ 19 is a peer dependency.

## Usage

```tsx
import { useGame, useBoardSelection } from '@chess-lib/react-hooks'

function ChessBoard() {
  const game = useGame() // re-renders on every move / undo / redo
  const { selection, clickTile, promotionTarget, completePromotion } =
    useBoardSelection()

  return (
    <div className="board">
      {game.board.getTilesWithPieces().map((tile) => (
        <Piece
          key={tile.piece.id} // stable identity → smooth animations
          tile={tile}
          selected={selection?.from === tile}
          highlighted={selection?.moves.includes(tile)}
          onClick={() => clickTile(tile)}
        />
      ))}
      {promotionTarget && <PromotionPicker onPick={completePromotion} />}
    </div>
  )
}
```

## API

| Export | What it does |
| --- | --- |
| `useGame()` | Subscribes the component to the shared game and returns the `Game` engine to read from. Re-renders on every move, undo or redo. |
| `useBoardSelection()` | The click-to-move state machine. Returns `{ selection, promotionTarget, clickTile, completePromotion }` — first click selects a piece and exposes its legal moves (with a capture-target set, including en passant); the second click moves it or opens the promotion flow. |
| `useTileAttackedFrom(tile)` | Returns the enemy piece-tile currently attacking `tile` (or `null`) — handy for highlighting a king in check. |
| `gameStore` | The underlying external store: `game`, `subscribe`, `getSnapshot`, and the mutating actions `tryMove` / `undo` / `redo` that notify subscribers. |

## License

[MIT](https://github.com/Carlos-err406/chess-lib/blob/main/LICENSE) © Carlos Daniel Vilaseca Illnait
