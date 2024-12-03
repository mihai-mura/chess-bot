import { Chess } from "chess.js";
import BoardEvaluation from "./boardEvaluation";

let positionsEvaluated = 0;

// minimaxRoot
const getBestMove = (
  depth: number,
  game: Chess,
  isWhite: boolean,
  useAlphaBeta: boolean,
): { move: string; positionsEvaluated: number } => {
  const gameMoves = game.moves();
  let bestMove = isWhite ? -9999 : 9999;
  let bestMoveFound = "";
  positionsEvaluated = 0;

  for (const move of gameMoves) {
    game.move(move);
    const value = useAlphaBeta
      ? minimaxAlphaBeta(depth - 1, game, -10000, 10000, !isWhite)
      : minimax(depth - 1, game, !isWhite);
    game.undo();
    if (isWhite && value >= bestMove) {
      bestMove = value;
      bestMoveFound = move;
    } else if (!isWhite && value <= bestMove) {
      bestMove = value;
      bestMoveFound = move;
    }
  }
  return { move: bestMoveFound, positionsEvaluated };
};

const minimax = (depth: number, game: Chess, isWhite: boolean) => {
  if (depth === 0) {
    positionsEvaluated++;
    return BoardEvaluation.evaluatePosition(game);
  }

  const gameMoves = game.moves();

  if (isWhite) {
    let bestEval = -9999;
    for (const move of gameMoves) {
      game.move(move);
      bestEval = Math.max(bestEval, minimax(depth - 1, game, !isWhite));
      game.undo();
    }
    return bestEval;
  } else {
    let bestEval = 9999;
    for (const move of gameMoves) {
      game.move(move);
      bestEval = Math.min(bestEval, minimax(depth - 1, game, !isWhite));
      game.undo();
    }
    return bestEval;
  }
};

const minimaxAlphaBeta = (
  depth: number,
  game: Chess,
  alpha: number,
  beta: number,
  isWhite: boolean,
) => {
  if (depth === 0) {
    positionsEvaluated++;
    return BoardEvaluation.evaluatePosition(game);
  }

  const gameMoves = game.moves();

  if (isWhite) {
    let bestEval = -9999;
    for (const move of gameMoves) {
      game.move(move);
      bestEval = Math.max(
        bestEval,
        minimaxAlphaBeta(depth - 1, game, alpha, beta, !isWhite),
      );
      game.undo();

      alpha = Math.max(alpha, bestEval);
      if (beta <= alpha) {
        return bestEval;
      }
    }
    return bestEval;
  } else {
    let bestEval = 9999;
    for (const move of gameMoves) {
      game.move(move);
      bestEval = Math.min(
        bestEval,
        minimaxAlphaBeta(depth - 1, game, alpha, beta, !isWhite),
      );
      game.undo();
      beta = Math.min(beta, bestEval);
      if (beta <= alpha) {
        return bestEval;
      }
    }
    return bestEval;
  }
};

export default getBestMove;
