// components/unge/DiceRoll.tsx
"use client";

import { useState } from "react";
import { rollDice } from "@/lib/unge/gameLogic";
import Button from "@/components/ui/Button";

// 目の数ごとに、9マスのグリッド上でどこにドットを置くかを定義
// マス目は 0〜8（3x3グリッド）で、使うマスだけ true にする
const DICE_PATTERNS: Record<number, boolean[]> = {
  1: [false, false, false, false, true, false, false, false, false],
  2: [true, false, false, false, false, false, false, false, true],
  3: [true, false, false, false, true, false, false, false, true],
  4: [true, false, true, false, false, false, true, false, true],
  5: [true, false, true, false, true, false, true, false, true],
  6: [true, false, true, true, false, true, true, false, true],
};

function DiceFace({ value }: { value: number | null }) {
  const pattern = value ? DICE_PATTERNS[value] : Array(9).fill(false);
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-1.5 w-20 h-20 p-3 border border-[#e8e8e8] bg-white">
      {pattern.map((dot, i) => (
        <div
          key={i}
          className={`rounded-full ${dot ? "bg-[#1a1a1a]" : "bg-transparent"}`}
        />
      ))}
    </div>
  );
}

export default function DiceRoll() {
  const [value, setValue] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  const handleRoll = () => {
    setRolling(true);
    setValue(null);
    setTimeout(() => {
      const { value: rolled } = rollDice();
      setValue(rolled);
      setHistory((prev) => [rolled, ...prev].slice(0, 8));
      setRolling(false);
    }, 400);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xs">
      <DiceFace value={rolling ? null : value} />

      <Button
        onClick={handleRoll}
        disabled={rolling}
        className="w-40 py-2.5 text-xs tracking-[0.3em]"
      >
        振る
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
