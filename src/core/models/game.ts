import type { Tile } from './board'
import { Board } from './board'
import type { Move } from './history'
import {
  CastlingMove,
  GenericMove,
  History,
  InPassantMove,
  PawnDoubleStepMove,
  PromotionMove,
} from './history'
import { Colors, King, Pawn } from './pieces'

export enum GameStatusKinds {
  ONGOING,
  WHITE_WIN,
  BLACK_WIN,
  STALEMATE,
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
    this.computeStatus()
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
      return
    }
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

  public isCheck(color: Colors) {
    const kingTile = this.board.getKingTile(color)
    const enemyTiles = this.board.getPlayerTiles(
      color === Colors.WHITE ? Colors.BLACK : Colors.WHITE,
    )
    for (const enemy of enemyTiles) {
      if (!enemy.piece) continue // invalid state
      const pseudoLegalMoves = enemy.piece.getPseudoMoves(this.board, enemy)
      if (pseudoLegalMoves.includes(kingTile)) return true
    }
    return false
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
}
