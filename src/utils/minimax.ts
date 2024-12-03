import { Chess } from "chess.js";
import BoardEvaluation from "./boardEvaluation";

// minimaxRoot
const getBestMove = (depth: number, game: Chess, isWhite: boolean): string => {
  const gameMoves = game.moves();
  let bestMove = isWhite ? -9999 : 9999;
  let bestMoveFound = "";

  for (const move of gameMoves) {
    game.move(move);
    const value = minimaxAlphaBeta(depth - 1, game, -10000, 10000, !isWhite);
    game.undo();
    if (isWhite && value >= bestMove) {
      bestMove = value;
      bestMoveFound = move;
    } else if (!isWhite && value <= bestMove) {
      bestMove = value;
      bestMoveFound = move;
    }
  }
  return bestMoveFound;
};

const minimax = (depth: number, game: Chess, isWhite: boolean) => {
  if (depth === 0) return BoardEvaluation.evaluatePosition(game);

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
  if (depth === 0) return BoardEvaluation.evaluatePosition(game);

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
