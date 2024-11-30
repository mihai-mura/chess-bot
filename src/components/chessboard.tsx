"use client";
import { Chess } from "chess.js";
import _ from "lodash";
import React, { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Piece, Square } from "react-chessboard/dist/chessboard/types";
import ChessEngine from "~/utils/chessEngine";

const MOVE_TIMEOUT_MS = 200;

function ChessGame(props: React.ComponentProps<"div">) {
  const [game, setGame] = useState(new Chess());

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

    //random move
    setTimeout(() => {
      setGame(ChessEngine.makeRandomMove(gameCopy));
    }, MOVE_TIMEOUT_MS);

    return true;
  }

  return (
    <div {...props}>
      <Chessboard boardWidth={700} position={game.fen()} onPieceDrop={onDrop} />
    </div>
  );
}

export default ChessGame;
