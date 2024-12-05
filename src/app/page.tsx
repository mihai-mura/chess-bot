"use client";
import { useState } from "react";
import ChessboardGame from "~/components/Chessboard";
import ChessGameForm, { ChessGameSettings } from "~/components/StartGameForm";

export default function HomePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSettings, setGameSettings] = useState<ChessGameSettings | null>(
    null,
  );

  const onSubmit = (data: ChessGameSettings) => {
    setGameSettings(data);
    setGameStarted(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {gameStarted ? (
        <ChessboardGame
          className="w-[700px] max-w-[90%]"
          gameSettings={gameSettings}
        />
      ) : (
        <ChessGameForm onSubmit={onSubmit} />
      )}
    </main>
  );
}
