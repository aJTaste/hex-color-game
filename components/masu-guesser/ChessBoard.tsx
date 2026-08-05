// components/masu-guesser/ChessBoard.tsx
"use client";

import { FeedbackState, Square } from "@/lib/masu-guesser/types";
import { isDarkSquare } from "@/lib/masu-guesser/gameLogic";

interface Props {
  onGuess: (square: Square) => void;
  feedback: FeedbackState | null;
}

const RANKS = [7, 6, 5, 4, 3, 2, 1, 0]; // 上から8,7,...,1（白視点）
const FILES = [0, 1, 2, 3, 4, 5, 6, 7]; // 左からA,...,H

export default function ChessBoard({ onGuess, feedback }: Props) {
  return (
    <div className="w-full aspect-square border border-[#1a1a1a] grid grid-cols-8 grid-rows-8 touch-manipulation select-none">
      {RANKS.map((rank) =>
        FILES.map((file) => {
          const dark = isDarkSquare(file, rank);
          const isTargetSquare =
            feedback && feedback.file === file && feedback.rank === rank;

          let bg = dark ? "bg-[#cfcfcf]" : "bg-[#F8F9FA]";
          if (isTargetSquare) {
            bg = feedback!.type === "correct" ? "bg-[#22c55e]" : "bg-[#ef4444]";
          }

          return (
            <button
              key={`${file}-${rank}`}
              onClick={() => onGuess({ file, rank })}
              aria-label={`${"ABCDEFGH"[file]}${rank + 1}のマス`}
              className={`${bg} w-full h-full block touch-manipulation cursor-pointer transition-colors duration-100`}
            />
          );
        }),
      )}
    </div>
  );
}
