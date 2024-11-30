import { Chess, Move } from "chess.js";
import _ from "lodash";
import BoardEvaluation from "./boardEvaluation";

class ChessEngine {
  static makeRandomMove = (currentGame: Chess): Chess => {
    const gameCopy = _.cloneDeep(currentGame);
    const possibleMoves = currentGame.moves();

    // exit if the game is over
    if (
      currentGame.isGameOver() ||
      currentGame.isDraw() ||
      possibleMoves.length === 0
    )
      return currentGame;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    gameCopy.move(possibleMoves[randomIndex] ?? "");

    return gameCopy;
  };

  static makeEvaluationMove = (currentGame: Chess): Chess => {
    const gameCopy = _.cloneDeep(currentGame);
    const possibleMoves = currentGame.moves();

    // exit if the game is over
    if (
      currentGame.isGameOver() ||
      currentGame.isDraw() ||
      possibleMoves.length === 0
    )
      return currentGame;

    const isWhitesTurn = currentGame.turn() === "w";
    let bestEval = BoardEvaluation.evaluatePosition(currentGame);
    let bestMove: Move | string = "";

    currentGame.moves().forEach((move) => {
      const testGame = _.cloneDeep(currentGame);
      testGame.move(move);
      const testGameEval = BoardEvaluation.evaluatePosition(testGame);

      if (isWhitesTurn) {
        if (testGameEval > bestEval) {
          bestEval = testGameEval;
          bestMove = move;
        }
      } else {
        if (testGameEval < bestEval) {
          bestEval = testGameEval;
          bestMove = move;
        }
      }
    });

    console.log(bestMove);
    if (bestMove === "") return this.makeRandomMove(currentGame);

    gameCopy.move(bestMove);
    return gameCopy;
  };
}

export default ChessEngine;
