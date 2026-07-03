# @chess-lib/core

> A framework-agnostic TypeScript chess engine — board, pieces, moves, history and full game rules.

Pure, tree-shakeable ESM with **zero runtime dependencies** and no DOM. Run it in Node, a web worker, a bot, or the browser — the rules are the same. Part of the [chess-lib](https://github.com/Carlos-err406/chess-lib) monorepo.

## Install

```bash
npm install @chess-lib/core
# or: pnpm add @chess-lib/core
```

## Usage

```ts
import { Game, Colors } from '@chess-lib/core'

const game = new Game()

// Whose move is it?
game.turnColor // Colors.WHITE ('white')

// Read legal moves for a square, then play one
const from = game.board.tileAtName('E2')
game.getLegalMoves(from) // [Tile E3, Tile E4]

const status = game.tryMove(from, game.board.tileAtName('E4'))
status // 'ongoing' | 'white wins' | 'black wins' | 'stale mate'

// Time travel
game.undo()
game.redo()

// Inspect the position
game.isCheck(Colors.WHITE) // false
game.getMaterial() // { white: {...}, black: {...} }
console.log(game.board.toString())
```

`board.toString()` gives a dependency-free ASCII view (uppercase = white, lowercase = black):

```text
  ABCDEFGH
8 rnbqkbnr
7 pppppppp
6
5
4
3
2 PPPPPPPP
1 RNBQKBNR
```

Promotions take a third argument:

```ts
game.tryMove(from, to, 'Queen') // 'Queen' | 'Rook' | 'Bishop' | 'Knight'
```

## What it handles

- **Complete legal move generation** — candidates are filtered by simulating each move and reverting it, so pins, checks and self-check are all respected.
- **Every special rule** — castling (king- & queenside with full path-safety checks), en passant, pawn double-step, and promotion.
- **Reversible history** — every move implements `apply()` / `undo()`, powering unlimited undo/redo.
- **Outcome detection** — checkmate, stalemate and turn tracking after each move.
- **Material scoring** via `getMaterial()`.
- **Stable piece identities** — each piece carries an immutable `id`, ideal as a render key.

## React?

For React bindings (`useGame`, `useBoardSelection`, …) see [`@chess-lib/react-hooks`](https://github.com/Carlos-err406/chess-lib/tree/main/packages/react/hooks).

## License

[MIT](https://github.com/Carlos-err406/chess-lib/blob/main/LICENSE) © Carlos Daniel Vilaseca Illnait
