// components/unge/CoinToss.tsx
"use client";

import { useState } from "react";
import { flipCoin } from "@/lib/unge/gameLogic";
import { CoinSide } from "@/lib/unge/types";
import Button from "@/components/ui/Button";

export default function CoinToss() {
  const [result, setResult] = useState<CoinSide | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [history, setHistory] = useState<CoinSide[]>([]);

  const handleFlip = () => {
    setFlipping(true);
    setResult(null);
    // 一瞬の「回転中」演出を挟んでから結果を出す
    setTimeout(() => {
      const { side } = flipCoin();
      setResult(side);
      setHistory((prev) => [side, ...prev].slice(0, 8));
      setFlipping(false);
    }, 400);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xs">
      <div className="w-28 h-28 rounded-full border border-[#e8e8e8] flex items-center justify-center bg-white">
        <span
          className={`font-mono-game text-3xl font-light text-[#1a1a1a] transition-opacity duration-200 ${
            flipping ? "opacity-20" : "opacity-100"
          }`}
        >
          {flipping ? "?" : (result ?? "―")}
        </span>
      </div>

      <Button
        onClick={handleFlip}
        disabled={flipping}
        className="w-40 py-2.5 text-xs tracking-[0.3em]"
      >
        投げる
      </Button>

      {history.length > 0 && (
        <div className="flex flex-col items-center gap-1">
          <span className="text-[7px] tracking-[0.25em] text-[#bbb] uppercase">
            履歴
          </span>
          <div className="flex gap-1.5 font-mono-game text-[10px] text-[#aaa]">
            {history.map((h, i) => (
              <span key={i}>{h}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
