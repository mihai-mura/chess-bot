import { Chess } from "chess.js";
import _ from "lodash";

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
}

export default ChessEngine;
