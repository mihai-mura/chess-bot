import { Chess, Piece, Square } from "chess.js";

class BoardEvaluation {
  static evaluatePosition = (game: Chess) => {
    let boardEvaluation = 0;

    for (let rank = 1; rank <= 8; rank++) {
      for (const file of "abcdefgh") {
        const square = `${file}${rank}` as Square;
        boardEvaluation += this.getSimplePieceValue(game.get(square), square);
      }
    }

    return boardEvaluation;
  };

  private static getSimplePieceValue = (piece: Piece, position: Square) => {
    if (!piece) return 0;

    const isWhite = piece.color === "w";
    let absoluteValue = 0;

    switch (piece.type) {
      case "p":
        absoluteValue = 10;
        break;
      case "n":
      case "b":
        absoluteValue = 30;
        break;
      case "r":
        absoluteValue = 50;
        break;
      case "q":
        absoluteValue = 90;
        break;
      case "k":
        absoluteValue = 900;
        break;
      default:
        throw new Error(`Unknown piece type: ${piece.type}`);
    }

    return isWhite ? absoluteValue : -absoluteValue;
  };

  // private static getPieceValue = (piece: Piece, position: Square) => {
  //   if (!piece) return 0;

  //   const isWhite = piece.color === "w";
  //   let absoluteValue = 0;

  //   switch (piece.type) {
  //     case "p":
  //       absoluteValue =
  //         10 + (isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x]);
  //       break;

  //     case "r":
  //       absoluteValue =
  //         50 + (isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x]);
  //       break;

  //     case "n":
  //       absoluteValue = 30 + knightEval[y][x];
  //       break;

  //     case "b":
  //       absoluteValue =
  //         30 + (isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x]);
  //       break;

  //     case "q":
  //       absoluteValue = 90 + evalQueen[y][x];
  //       break;

  //     case "k":
  //       absoluteValue =
  //         900 + (isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x]);
  //       break;

  //     default:
  //       absoluteValue = 0; // Optionally handle unknown piece types
  //       break;
  //   }

  //   return isWhite ? absoluteValue : -absoluteValue;
  // };
}

export default BoardEvaluation;
