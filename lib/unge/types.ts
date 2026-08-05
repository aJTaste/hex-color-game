// lib/unge/types.ts

// 今後追加するゲームもここに追記していく
export type GameKind = "coin" | "dice" | "kuji" | "roulette" | "gacha" | "slot";

export interface GameTab {
  key: GameKind;
  label: string;
  enabled: boolean; // 未実装のうちは false
}

export type CoinSide = "表" | "裏";

export interface CoinResult {
  side: CoinSide;
}

export interface DiceResult {
  value: number; // 1〜6
}

export interface KujiResult {
  hit: boolean;
  probability: number; // 抽選時点の当たり確率（%）
}
