// app/masu-guesser/page.tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { GameState, Square } from "@/lib/masu-guesser/types";
import {
  generateRandomSquare,
  squareToNotation,
  isSameSquare,
  GAME_DURATION,
} from "@/lib/masu-guesser/gameLogic";
import ChessBoard from "@/components/masu-guesser/ChessBoard";
import ResultPanel from "@/components/masu-guesser/ResultPanel";
import CategoryTitle from "@/components/ui/CategoryTitle";
import PageFooter from "@/components/ui/PageFooter";
import Button from "@/components/ui/Button";

const BEST_SCORE_KEY = "masu-guesser-best-score";
const CORRECT_FEEDBACK_MS = 120; // 正解時、次のお題に移るまでの間（連打防止）
const WRONG_FEEDBACK_MS = 200; // 不正解時、赤フラッシュの表示時間

function createInitialState(): GameState {
  return {
    phase: "idle",
    target: { file: 0, rank: 0 },
    score: 0,
    timeLeft: GAME_DURATION,
    feedback: null,
  };
}

export default function Page() {
  const [state, setState] = useState<GameState>(createInitialState);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [isNewBest, setIsNewBest] = useState(false);

  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputLockRef = useRef(false);

  // 保存されたベストスコアを読み込む
  useEffect(() => {
    try {
      const saved = localStorage.getItem(BEST_SCORE_KEY);
      if (saved) setBestScore(Number(saved));
    } catch {
      // localStorageが使えない環境は無視
    }
  }, []);

  // 30秒カウントダウン
  useEffect(() => {
    if (state.phase !== "playing") return;
    if (state.timeLeft <= 0) {
      setState((prev) => ({ ...prev, phase: "finished" }));
      return;
    }
    const id = setTimeout(() => {
      setState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
    }, 1000);
    return () => clearTimeout(id);
  }, [state.phase, state.timeLeft]);

  // ゲーム終了時にベストスコアを更新
  useEffect(() => {
    if (state.phase !== "finished") return;
    if (bestScore === null || state.score > bestScore) {
      setIsNewBest(true);
      setBestScore(state.score);
      try {
        localStorage.setItem(BEST_SCORE_KEY, String(state.score));
      } catch {
        // localStorageが使えない環境は無視
      }
    } else {
      setIsNewBest(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase]);

  // アンマウント時に残っているタイマーを片付ける
  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  const handleStart = useCallback(() => {
    inputLockRef.current = false;
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setIsNewBest(false);
    setState({
      phase: "playing",
      target: generateRandomSquare(),
      score: 0,
      timeLeft: GAME_DURATION,
      feedback: null,
    });
  }, []);

  const handleGuess = useCallback(
    (square: Square) => {
      if (state.phase !== "playing" || inputLockRef.current) return;

      if (isSameSquare(square, state.target)) {
        inputLockRef.current = true;
        setState((prev) => ({
          ...prev,
          score: prev.score + 1,
          feedback: { type: "correct", ...square },
        }));

        if (feedbackTimeoutRef.current)
          clearTimeout(feedbackTimeoutRef.current);
        feedbackTimeoutRef.current = setTimeout(() => {
          setState((prev) => ({
            ...prev,
            feedback: null,
            target: generateRandomSquare(prev.target),
          }));
          inputLockRef.current = false;
        }, CORRECT_FEEDBACK_MS);
      } else {
        setState((prev) => ({
          ...prev,
          feedback: { type: "wrong", ...square },
        }));

        if (feedbackTimeoutRef.current)
          clearTimeout(feedbackTimeoutRef.current);
        feedbackTimeoutRef.current = setTimeout(() => {
          setState((prev) => ({ ...prev, feedback: null }));
        }, WRONG_FEEDBACK_MS);
      }
    },
    [state.phase, state.target],
  );

  const { phase, target, score, timeLeft, feedback } = state;

  return (
    <main className="flex flex-col items-center bg-[#F8F9FA] h-[100dvh]">
      <header className="flex-shrink-0 w-full max-w-xs flex justify-between items-end px-1 pt-4 pb-3">
        <CategoryTitle category="Games" title="MasuGuesser" />
        {bestScore !== null && (
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[7px] tracking-[0.2em] text-[#bbb] uppercase">
              Best
            </span>
            <span className="font-mono-game text-sm leading-none text-[#1a1a1a]">
              {bestScore}
            </span>
          </div>
        )}
      </header>

      <div className="w-full max-w-xs border-t border-[#e8e8e8]" />

      <div className="flex-1 flex flex-col items-center justify-center gap-4 w-full px-5 overflow-y-auto py-4">
        {phase === "idle" && (
          <div className="flex flex-col items-center gap-6 max-w-xs text-center">
            <p className="text-xs leading-relaxed text-[#666] tracking-[0.05em]">
              表示されたマス目の名前（例：E4）を見て、
              盤面の対応するマスを素早くタップ！
              <br />
              30秒間で何回正解できるか挑戦しよう。
            </p>
            <Button
              onClick={handleStart}
              className="w-40 py-2.5 text-xs tracking-[0.3em]"
            >
              スタート
            </Button>
          </div>
        )}

        {phase === "playing" && (
          <div className="w-full max-w-[300px] sm:max-w-[420px] md:max-w-[480px] flex flex-col items-center gap-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-[7px] tracking-[0.2em] text-[#bbb] uppercase">
                  Time
                </span>
                <span
                  className={`font-mono-game text-xl sm:text-2xl leading-none ${
                    timeLeft <= 5 ? "text-[#ef4444]" : "text-[#1a1a1a]"
                  }`}
                >
                  {timeLeft}
                </span>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-[7px] tracking-[0.2em] text-[#bbb] uppercase">
                  Score
                </span>
                <span className="font-mono-game text-xl sm:text-2xl leading-none text-[#1a1a1a]">
                  {score}
                </span>
              </div>
            </div>

            <span className="font-mono-game text-5xl sm:text-6xl font-light tracking-[0.05em] text-[#1a1a1a] leading-none py-1">
              {squareToNotation(target)}
            </span>

            <ChessBoard onGuess={handleGuess} feedback={feedback} />
          </div>
        )}

        {phase === "finished" && (
          <ResultPanel
            score={score}
            bestScore={bestScore}
            isNewBest={isNewBest}
            onRestart={handleStart}
          />
        )}
      </div>

      <PageFooter />
    </main>
  );
}
