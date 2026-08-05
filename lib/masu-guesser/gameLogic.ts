// lib/masu-guesser/gameLogic.ts
import { Square } from "@/lib/masu-guesser/types";

export const FILES = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;
export const GAME_DURATION = 30; // 秒

/** マス情報を "E4" のような代数式表記法の文字列に変換する */
export function squareToNotation(square: Square): string {
  return `${FILES[square.file]}${square.rank + 1}`;
}

export function isSameSquare(a: Square, b: Square): boolean {
  return a.file === b.file && a.rank === b.rank;
}

/** ランダムなマスを返す。直前のマスと同じにならないようにする */
export function generateRandomSquare(prev?: Square | null): Square {
  let next: Square;
  do {
    next = {
      file: Math.floor(Math.random() * 8),
      rank: Math.floor(Math.random() * 8),
    };
  } while (prev && isSameSquare(next, prev));
  return next;
}

/** 標準的なチェス盤の配色ルール（a1が暗いマス） */
export function isDarkSquare(file: number, rank: number): boolean {
  return (file + rank) % 2 === 0;
}
