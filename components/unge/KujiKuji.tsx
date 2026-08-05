// components/unge/KujiKuji.tsx
"use client";

import { useState } from "react";
import { drawKuji } from "@/lib/unge/gameLogic";
import Button from "@/components/ui/Button";

const MIN_PROB = 1;
const MAX_PROB = 99;
const STEP = 5;

export default function KujiKuji() {
  const [probability, setProbability] = useState(30);
  const [result, setResult] = useState<boolean | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [history, setHistory] = useState<boolean[]>([]);

  const changeProbability = (dir: 1 | -1) => {
    setProbability((prev) => {
      const next = prev + dir * STEP;
      return Math.min(Math.max(next, MIN_PROB), MAX_PROB);
    });
  };

  const handleDraw = () => {
    setDrawing(true);
    setResult(null);
    setTimeout(() => {
      const { hit } = drawKuji(probability);
      setResult(hit);
      setHistory((prev) => [hit, ...prev].slice(0, 8));
      setDrawing(false);
    }, 400);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xs">
      {/* 確率設定 */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => changeProbability(-1)}
          disabled={probability <= MIN_PROB}
          className="w-8 h-8 text-xs"
        >
          −
        </Button>
        <div className="flex flex-col items-center w-24">
          <span className="text-[7px] tracking-[0.2em] text-[#bbb] uppercase">
            当たる確率
          </span>
          <span className="font-mono-game text-xl font-light text-[#1a1a1a]">
            {probability}%
          </span>
        </div>
        <Button
          onClick={() => changeProbability(1)}
          disabled={probability >= MAX_PROB}
          className="w-8 h-8 text-xs"
        >
          ＋
        </Button>
      </div>

      {/* 結果表示 */}
      <div className="w-28 h-28 rounded-full border border-[#e8e8e8] flex items-center justify-center bg-white">
        <span
          className={`font-mono-game text-lg font-light tracking-[0.1em] transition-opacity duration-200 ${
            drawing ? "opacity-20" : "opacity-100"
          }`}
          style={{
            color: result === null ? "#1a1a1a" : result ? "#22c55e" : "#ef4444",
          }}
        >
          {drawing ? "?" : result === null ? "―" : result ? "当たり" : "はずれ"}
        </span>
      </div>

      <Button
        onClick={handleDraw}
        disabled={drawing}
        className="w-40 py-2.5 text-xs tracking-[0.3em]"
      >
        引く
      </Button>

      {history.length > 0 && (
        <div className="flex flex-col items-center gap-1">
          <span className="text-[7px] tracking-[0.25em] text-[#bbb] uppercase">
            履歴
          </span>
          <div className="flex gap-1.5">
            {history.map((h, i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: h ? "#22c55e" : "#ef4444" }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
