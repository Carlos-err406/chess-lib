import type { Col } from './board'
import { Board, Tile } from './board'
import type { Move } from './history'
import {
  CastlingMove,
  GenericMove,
  History,
  InPassantMove,
  PawnDoubleStepMove,
  PromotionMove,
} from './history'
import { Colors, King, Pawn, Rook } from './pieces'

export enum GameStatusKinds {
  ONGOING = 'ongoing',
  WHITE_WIN = 'white wins',
  BLACK_WIN = 'black wins',
  STALEMATE = 'stale mate',
}

export class Game {
  board: Board
  history: History
  #status!: GameStatusKinds

  constructor() {
    this.board = new Board()
    this.history = new History()
    this.status = GameStatusKinds.ONGOING
  }

  public get turnColor(): Colors {
    return this.history.length % 2 ? Colors.BLACK : Colors.WHITE
  }

  public get status() {
    return this.#status
  }

  private set status(value: GameStatusKinds) {
    this.#status = value
  }

  public clearBoard() {
    this.board.clear()
  }

  private getPseudoMoves(from: Tile): Tile[] {
    return from.piece?.getPseudoMoves(this.board, from) ?? []
  }

  public getLegalMoves(from: Tile): Tile[] {
    const fromPiece = from.piece
    const moves: Tile[] = []
    if (!fromPiece) return moves
    const candidates = this.getPseudoMoves(from)
    const enPassant = this.getEnPassantTarget(from)
    if (enPassant) candidates.push(enPassant)
    candidates.push(...this.getCastlingTargets(from))

    for (const to of candidates) {
      const undo = this.simulateMove(from, to)
      const safe = !this.isCheck(fromPiece.color)
      undo() // ALWAYS revert the simulation
      if (safe) moves.push(to) // record legality AFTER reverting
    }
    return moves
  }

  public tryMove(from: Tile, to: Tile) {
    const fromPiece = from.piece
    if (!fromPiece) return
    if (fromPiece.color !== this.turnColor) return
    if (!this.getLegalMoves(from).includes(to)) return

    const move = this.buildMove(from, to)
    move.apply(this.board)

    this.history.push(move)
    return this.computeStatus()
  }

  public undo() {
    const move = this.history.undo(this.board)
    if (move) this.computeStatus()
    return move
  }

  public redo() {
    const move = this.history.redo(this.board)
    if (move) this.computeStatus()
    return move
  }

  private simulateMove(from: Tile, to: Tile): () => void {
    const fromPiece = from.piece
    if (!fromPiece) return () => {}
    const move = this.buildMove(from, to)
    move.apply(this.board)
    return () => move.undo(this.board)
  }

  private computeStatus() {
    const side = this.turnColor
    const hasMove = this.board
      .getPlayerTiles(side) // current turn tiles
      .some((tile) => this.getLegalMoves(tile).length > 0) // check for amount of legal moves the player can do
    if (hasMove) {
      // if the player has legal moves to make then nothing is decided yet
      this.status = GameStatusKinds.ONGOING
    } else {
      // the player has no moves to make, is either checkmate or stalemate depending on if the king is in check
      if (this.isCheck(side)) {
        if (side === Colors.WHITE) {
          // checkmate white, black wins
          this.status = GameStatusKinds.BLACK_WIN
        } else {
          // checkmate black, white wins
          this.status = GameStatusKinds.WHITE_WIN
        }
      } else {
        // no legal moves to make, but not in check, stalemate
        this.status = GameStatusKinds.STALEMATE
      }
    }
    return this.#status
  }

  public isCheck(color: Colors): boolean {
    return this.isSquareAttacked(
      this.board.getKingTile(color),
      Game.enemyOf(color),
    )
  }

  private buildMove(from: Tile, to: Tile): Move {
    const piece = from.piece! // tryMove already verified non-null
    if (piece instanceof Pawn) {
      if (Board.isPromotionRank(to, piece.color)) {
        return new PromotionMove(from.name, to.name) // TODO: Chosen piece
      }
      if (from.col !== to.col && to.piece === null) {
        return new InPassantMove(from.name, to.name)
      }
      if (Math.abs(to.row - from.row) === 2) {
        return new PawnDoubleStepMove(from.name, to.name)
      }
    }

    // Castling: a king moving two files
    if (piece instanceof King && Math.abs(to.col - from.col) === 2) {
      return new CastlingMove(from.name, to.name)
    }

    // Everything else (quiet move or normal capture)
    return new GenericMove(from.name, to.name)
  }

  private getEnPassantTarget(from: Tile): Tile | null {
    const pawn = from.piece
    if (!(pawn instanceof Pawn)) return null
    const targetName = this.history.last?.enPassantTarget() ?? null
    if (!targetName) return null
    const target = this.board.tileAtName(targetName)

    // target must be reachable by one of this pawn's diagonal capture deltas
    const reachable = pawn.isCaptureSquare(from, target)
    return reachable ? target : null
  }
  private getCastlingTargets(from: Tile): Tile[] {
    const king = from.piece
    const kingRank = from.rowName // 1 | 8
    if (!(king instanceof King) || king.moved) return []
    const enemy = Game.enemyOf(king.color)
    // cant castle if king is under attack (check)
    if (this.isSquareAttacked(from, enemy)) return []

    const targets: Tile[] = []

    const file = (col: Col) => new Tile(col, kingRank) // column factory helper

    // kingside: rook H, squares F+G empty, king crosses F to G
    const kingSideTarget = this.tryCastleSide(enemy, {
      rookSq: file('H'),
      emptySquares: [file('F'), file('G')],
      kingPath: [file('F'), file('G')], // crossed + destination, both must be safe
    })
    if (kingSideTarget) targets.push(kingSideTarget)

    // queenside: rook A, squares B+C+D empty, king crosses D to C
    const queenSideTarget = this.tryCastleSide(enemy, {
      rookSq: file('A'),
      emptySquares: [file('B'), file('C'), file('D')], // 3 empty (B included!)
      kingPath: [file('D'), file('C')], // king only crosses D,C — NOT B
    })
    if (queenSideTarget) targets.push(queenSideTarget)

    return targets
  }

  private tryCastleSide(
    enemy: Colors,
    spec: {
      rookSq: Tile
      emptySquares: Tile[]
      kingPath: Tile[]
    },
  ) {
    const rookTile = this.board.tileAtName(spec.rookSq.name)
    const rook = rookTile.piece
    // if the rook didnt move;
    if (!(rook instanceof Rook) || rook.moved) return

    // and all squares between king and rook are empty;
    if (
      spec.emptySquares.some(
        (sq) => this.board.tileAtName(sq.name).piece !== null,
      )
    )
      return

    // and the king's path is not under attack (path includes the destination);
    if (
      spec.kingPath.some((sq) =>
        this.isSquareAttacked(this.board.tileAtName(sq.name), enemy),
      )
    )
      return

    // then the king can castle
    return this.board.tileAtName(spec.kingPath.at(-1)!.name)
  }

  private isSquareAttacked(tile: Tile, byColor: Colors): boolean {
    for (const enemy of this.board.getPlayerTiles(byColor)) {
      if (!enemy.piece) continue
      if (enemy.piece.getPseudoMoves(this.board, enemy).includes(tile))
        return true
    }
    return false
  }

  public static enemyOf(color: Colors) {
    if (color === Colors.WHITE) return Colors.BLACK
    else return Colors.WHITE
  }

  public getMaterial() {
    return this.history.moves.reduce<{
      [Colors.WHITE]: number
      [Colors.BLACK]: number
    }>(
      (acc, move) => {
        const metaWithCapturedPiece = move.metadata.find(
          (meta) => meta.capturedPieceName,
        )
        if (!metaWithCapturedPiece) return acc

        acc[metaWithCapturedPiece.movedPieceColor] +=
          metaWithCapturedPiece.capturedPieceValue ?? 0

        return acc
      },
      { [Colors.WHITE]: 0, [Colors.BLACK]: 0 },
    )
  }

  public getCapturedAssets() {
    return this.history.moves.reduce<{
      [Colors.WHITE]: string[]
      [Colors.BLACK]: string[]
    }>(
      (acc, move) => {
        const metaWithCapturedPiece = move.metadata.find(
          (meta) => meta.capturedPieceName,
        )
        if (!metaWithCapturedPiece?.capturedPieceAsset) return acc

        acc[metaWithCapturedPiece.movedPieceColor].push(
          metaWithCapturedPiece.capturedPieceAsset,
        )

        return acc
      },
      { [Colors.WHITE]: [], [Colors.BLACK]: [] },
    )
  }
}
