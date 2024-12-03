"use client";
import { Chess } from "chess.js";
import _ from "lodash";
import React, { useState } from "react";
import { Chessboard } from "react-chessboard";
import {
  Piece,
  PromotionPieceOption,
  Square,
} from "react-chessboard/dist/chessboard/types";
import ChessEngine from "~/utils/chessEngine";

const AI_MOVE_TIMEOUT_MS = 200;
const PLAYER_MOVE_TIMEOUT = 200;

function ChessGame(props: React.ComponentProps<"div">) {
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [moveTo, setMoveTo] = useState<Square | null>(null);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});

  function onDrop(sourceSquare: Square, targetSquare: Square, piece: Piece) {
    const gameCopy = _.cloneDeep(game);
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1]?.toLowerCase() ?? "q",
    });

    // illegal move
    if (move === null) return false;

    setGame(gameCopy);

    setTimeout(() => {
      setGame(ChessEngine.makeMinimaxMove(gameCopy, 3));
    }, AI_MOVE_TIMEOUT_MS);

    return true;
  }

  function getMoveOptions(square: Square) {
    const moves = game.moves({
      square,
      verbose: true,
    });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }
    const newSquares: { [key: string]: any } = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to).color !== game.get(square).color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
      return move;
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick(square: Square) {
    setRightClickedSquares({});

    // from square
    if (!moveFrom) {
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    // to square
    if (!moveTo) {
      // check if valid move before showing dialog
      const moves = game.moves({
        square: moveFrom,
        verbose: true,
      });
      const foundMove = moves.find(
        (m) => m.from === moveFrom && m.to === square,
      );
      // not a valid move
      if (!foundMove) {
        // check if clicked on new piece
        const hasMoveOptions = getMoveOptions(square);
        // if new piece, setMoveFrom, otherwise clear moveFrom
        setMoveFrom(hasMoveOptions ? square : null);
        return;
      }

      // valid move
      setMoveTo(square);

      // if promotion move
      if (
        (foundMove.color === "w" &&
          foundMove.piece === "p" &&
          square[1] === "8") ||
        (foundMove.color === "b" &&
          foundMove.piece === "p" &&
          square[1] === "1")
      ) {
        setShowPromotionDialog(true);
        return;
      }

      // is normal move
      const gameCopy = _.cloneDeep(game);
      const move = gameCopy.move({
        from: moveFrom,
        to: square,
        promotion: "q",
      });

      // if invalid, setMoveFrom and getMoveOptions
      if (move === null) {
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) setMoveFrom(square);
        return;
      }
      setGame(gameCopy);
      setMoveFrom(null);
      setMoveTo(null);
      setOptionSquares({});

      setTimeout(() => {
        setGame(ChessEngine.makeMinimaxMove(gameCopy, 3));
      }, AI_MOVE_TIMEOUT_MS + PLAYER_MOVE_TIMEOUT);
    }
  }

  function onPromotionPieceSelect(piece: PromotionPieceOption | undefined) {
    // if no piece passed then user has cancelled dialog, don't make move and reset
    if (piece) {
      const gameCopy = _.cloneDeep(game);
      gameCopy.move({
        from: moveFrom ?? "",
        to: moveTo ?? "",
        promotion: piece[1]!.toLowerCase() ?? "q",
      });
      setGame(gameCopy);

      setTimeout(() => {
        setMoveFrom(null);
        setMoveTo(null);
        setShowPromotionDialog(false);
        setOptionSquares({});

        setGame(ChessEngine.makeMinimaxMove(gameCopy, 3));
      }, AI_MOVE_TIMEOUT_MS + PLAYER_MOVE_TIMEOUT);
    } else {
      setMoveFrom(null);
      setMoveTo(null);
      setShowPromotionDialog(false);
      setOptionSquares({});
    }
    return true;
  }

  return (
    <div {...props}>
      <Chessboard
        boardWidth={700}
        position={game.fen()}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
        customSquareStyles={{
          ...moveSquares,
          ...optionSquares,
          ...rightClickedSquares,
        }}
        onSquareClick={onSquareClick}
        onPromotionPieceSelect={onPromotionPieceSelect}
        promotionToSquare={moveTo}
        showPromotionDialog={showPromotionDialog}
      />
    </div>
  );
}

export default ChessGame;
