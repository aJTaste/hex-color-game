// components/masu-guesser/ResultPanel.tsx
"use client";

import Button from "@/components/ui/Button";

interface Props {
  score: number;
  bestScore: number | null;
  isNewBest: boolean;
  onRestart: () => void;
}

export default function ResultPanel({
  score,
  bestScore,
  isNewBest,
  onRestart,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-xs">
      <span className="text-[7px] tracking-[0.3em] text-[#bbb] uppercase">
        Time Up
      </span>

      <div className="flex flex-col items-center gap-1">
        <span className="font-mono-game text-6xl font-light leading-none text-[#1a1a1a]">
          {score}
        </span>
        <span className="text-[9px] tracking-[0.25em] text-[#bbb] uppercase">
          回正解
        </span>
      </div>

      {isNewBest ? (
        <span className="text-[10px] tracking-[0.15em] text-[#22c55e]">
          ベストスコア更新！
        </span>
      ) : (
        bestScore !== null && (
          <span className="text-[10px] tracking-[0.15em] text-[#bbb]">
            ベスト：{bestScore}
          </span>
        )
      )}

      <div className="w-full border-t border-[#ebebeb]" />

      <Button
        onClick={onRestart}
        className="w-40 py-2.5 text-xs tracking-[0.3em]"
      >
        もう一度
      </Button>
    </div>
  );
}
