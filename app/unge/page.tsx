// app/unge/page.tsx
"use client";

import { useState } from "react";
import { GameKind, GameTab } from "@/lib/unge/types";
import GameTabs from "@/components/unge/GameTabs";
import CoinToss from "@/components/unge/CoinToss";
import DiceRoll from "@/components/unge/DiceRoll";
import KujiKuji from "@/components/unge/KujiKuji";
import CategoryTitle from "@/components/ui/CategoryTitle";
import PageFooter from "@/components/ui/PageFooter";

const TABS: GameTab[] = [
  { key: "coin", label: "コイントス", enabled: true },
  { key: "dice", label: "サイコロ", enabled: true },
  { key: "kuji", label: "二択くじ", enabled: true },
  { key: "roulette", label: "ルーレット", enabled: false },
  { key: "gacha", label: "ガチャ", enabled: false },
  { key: "slot", label: "スロット", enabled: false },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<GameKind>("coin");

  return (
    <main className="flex flex-col items-center bg-[#F8F9FA] h-[100dvh]">
      <header className="flex-shrink-0 w-full max-w-xs px-1 pt-4 pb-3">
        <CategoryTitle category="Tools" title="運ゲー" />
      </header>

      <div className="w-full max-w-xs border-t border-[#e8e8e8]" />

      <div className="flex-shrink-0 pt-3">
        <GameTabs tabs={TABS} activeTab={activeTab} onSelect={setActiveTab} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 w-full max-w-xs px-5 overflow-y-auto py-3">
        {activeTab === "coin" && <CoinToss />}
        {activeTab === "dice" && <DiceRoll />}
        {activeTab === "kuji" && <KujiKuji />}
        {activeTab !== "coin" &&
          activeTab !== "dice" &&
          activeTab !== "kuji" && (
            <p className="text-[10px] tracking-[0.2em] text-[#ccc] uppercase">
              準備中
            </p>
          )}
      </div>

      <PageFooter />
    </main>
  );
}
