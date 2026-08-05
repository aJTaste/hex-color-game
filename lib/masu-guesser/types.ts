// lib/masu-guesser/types.ts
export type GamePhase = "idle" | "playing" | "finished";

export interface Square {
  file: number; // 0〜7 → A〜H
  rank: number; // 0〜7 → 1〜8
}

export interface FeedbackState {
  type: "correct" | "wrong";
  file: number;
  rank: number;
}

export interface GameState {
  phase: GamePhase;
  target: Square;
  score: number;
  timeLeft: number;
  feedback: FeedbackState | null;
}
