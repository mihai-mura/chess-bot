import { Chess } from "chess.js";
import BoardEvaluation from "./boardEvaluation";

// minimaxRoot
const getBestMove = (depth: number, game: Chess, isWhite: boolean): string => {
  const gameMoves = game.moves();
  let bestMove = isWhite ? -9999 : 9999;
  let bestMoveFound: string = "";

  for (let i = 0; i < gameMoves.length; i++) {
    const newGameMove = gameMoves[i] ?? "";
    game.move(newGameMove ?? "");
    const value = minimax(depth - 1, game, !isWhite);
    game.undo();
    if (isWhite && value >= bestMove) {
      bestMove = value;
      bestMoveFound = newGameMove;
    } else if (!isWhite && value <= bestMove) {
      bestMove = value;
      bestMoveFound = newGameMove;
    }
  }
  return bestMoveFound;
};

const minimax = (depth: number, game: Chess, isWhite: boolean) => {
  if (depth === 0) return BoardEvaluation.evaluatePosition(game);

  const gameMoves = game.moves();

  if (isWhite) {
    let bestEval = -9999;
    for (let i = 0; i < gameMoves.length; i++) {
      game.move(gameMoves[i] ?? "");
      bestEval = Math.max(bestEval, minimax(depth - 1, game, !isWhite));
      game.undo();
    }
    return bestEval;
  } else {
    let bestEval = 9999;
    for (let i = 0; i < gameMoves.length; i++) {
      game.move(gameMoves[i] ?? "");
      bestEval = Math.min(bestEval, minimax(depth - 1, game, !isWhite));
      game.undo();
    }
    return bestEval;
  }
};

// const minimax = (
//   depth: number,
//   game: Chess,
//   alpha: number,
//   beta: number,
//   isMaximizingPlayer: boolean,
// ) => {
//   if (depth === 0) return -BoardEvaluation.evaluatePosition(game);

//   const gameMoves = game.moves();

//   if (isMaximizingPlayer) {
//     let bestMove = -9999;
//     for (let i = 0; i < gameMoves.length; i++) {
//       game.move(gameMoves[i] ?? "");
//       bestMove = Math.max(
//         bestMove,
//         minimax(depth - 1, game, alpha, beta, !isMaximizingPlayer),
//       );
//       game.undo();
//       alpha = Math.max(alpha, bestMove);
//       if (beta <= alpha) {
//         return bestMove;
//       }
//     }
//     return bestMove;
//   } else {
//     let bestMove = 9999;
//     for (let i = 0; i < gameMoves.length; i++) {
//       game.move(gameMoves[i] ?? "");
//       bestMove = Math.min(
//         bestMove,
//         minimax(depth - 1, game, alpha, beta, !isMaximizingPlayer),
//       );
//       game.undo();
//       beta = Math.min(beta, bestMove);
//       if (beta <= alpha) {
//         return bestMove;
//       }
//     }
//     return bestMove;
//   }
// };

export default getBestMove;
