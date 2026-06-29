import { Board } from './board'
import type { Color, Piece } from './piece'
import type { Tile, TileName } from './tile'

type GameStatus = 'ongoing' | 'w-win' | 'b-win' | 'stalemate'

type Move = {
  piece: Piece
  flippedMovedFlag: boolean // was this the piece's first move?
  from: TileName
  to: TileName
  captured: Piece | null // for undo + capture history
}

export class Game {
  board: Board
  history: Move[]
  private redoStack: Move[] = []

  private status: GameStatus

  constructor() {
    this.board = new Board()
    this.status = 'ongoing'
    this.history = []
  }
  get turnColor(): Color {
    return this.history.length % 2 ? 'black' : 'white'
  }
  private getPseudoLegalMoves(from: Tile): Tile[] {
    return from.piece?.getPseudoMoves(this.board, from) ?? []
  }

  public getLegalMoves(from: Tile): Tile[] {
    const fromPiece = from.piece
    const moves: Tile[] = []
    if (!fromPiece) return moves
    for (const to of this.getPseudoLegalMoves(from)) {
      const undo = this.simulate(from, to)
      const safe = !this.isCheck(fromPiece.color)
      undo() // ALWAYS revert the simulation
      if (safe) moves.push(to) // record legality AFTER reverting
    }
    return moves
  }

  
  public tryMove(from: Tile, to: Tile): boolean {
    const fromPiece = from.piece
    if (!fromPiece) return false
    if (fromPiece.color !== this.turnColor) return false
    if (!this.getLegalMoves(from).includes(to)) return false
    const result = this.board.move(from, to)
    if (!result) return false
    const { captured, flippedMovedFlag } = result
    this.history.push({
      captured,
      from: from.name,
      to: to.name,
      piece: fromPiece,
      flippedMovedFlag,
    })
    this.redoStack = []
    this.computeStatus()
    return true
  }

  public undo(simulated = false) {
    const move = this.history.pop()
    if (!move) return
    const { captured, from, piece, to } = move
    const fromTile = this.board.tileAtName(from)
    const toTile = this.board.tileAtName(to)
    toTile.setPiece(captured)
    piece.moved = !move.flippedMovedFlag
    fromTile.setPiece(piece)
    if (!simulated) this.redoStack.push(move)
    return move
  }

  public redo() {
    const move = this.redoStack.pop()
    if (!move) return
    const fromTile = this.board.tileAtName(move.from)
    const toTile = this.board.tileAtName(move.to)
    this.board.move(fromTile, toTile) // replay the mutation directly, no re-validation
    this.history.push(move)
    this.computeStatus()
    return move
  }

  private simulate(from: Tile, to: Tile): () => void {
    const movedPiece = from.piece // capture BEFORE the move mutates anything
    const res = this.board.move(from, to)
    if (!res || !movedPiece) return () => {}
    return () => {
      to.setPiece(res.captured) // destination ← captured piece (or null)
      movedPiece.moved = !res.flippedMovedFlag // restore the mover's moved flag
      from.setPiece(movedPiece) // origin ← the mover
    }
  }

  private computeStatus() {}

  public isCheck(color: Color) {
    const kingTile = this.board.getKingTile(color)
    const enemyTiles = this.board.getPlayerTiles(
      color === 'white' ? 'black' : 'white',
    )
    for (const enemy of enemyTiles) {
      if (!enemy.piece) continue // invalid state
      const pseudoLegalMoves = enemy.piece.getPseudoMoves(this.board, enemy)
      if (pseudoLegalMoves.includes(kingTile)) return true
    }
    return false
  }
}
