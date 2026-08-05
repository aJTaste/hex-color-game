// lib/unge/gameLogic.ts
import { CoinSide, CoinResult } from "@/lib/unge/types";
import { DiceResult } from "@/lib/unge/types";
import { KujiResult } from "@/lib/unge/types";

/** 表裏をランダムに1回判定する */
export function flipCoin(): CoinResult {
  const side: CoinSide = Math.random() < 0.5 ? "表" : "裏";
  return { side };
}

/** サイコロを1回振って1〜6の目を返す */
export function rollDice(): DiceResult {
  const value = Math.floor(Math.random() * 6) + 1;
  return { value };
}

/** 指定した確率（%）で当たり判定を行う */
export function drawKuji(probabilityPercent: number): KujiResult {
  const hit = Math.random() * 100 < probabilityPercent;
  return { hit, probability: probabilityPercent };
}
