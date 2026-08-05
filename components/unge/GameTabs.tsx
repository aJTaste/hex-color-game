// components/unge/GameTabs.tsx
"use client";

import { GameKind, GameTab } from "@/lib/unge/types";

interface Props {
  tabs: GameTab[];
  activeTab: GameKind;
  onSelect: (tab: GameKind) => void;
}

export default function GameTabs({ tabs, activeTab, onSelect }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 w-full max-w-xs">
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            onClick={() => tab.enabled && onSelect(tab.key)}
            disabled={!tab.enabled}
            className={`text-[10px] tracking-[0.15em] pb-1 border-b-2 transition-colors duration-200 ${
              isActive
                ? "text-[#1a1a1a] border-[#1a1a1a]"
                : tab.enabled
                  ? "text-[#bbb] border-transparent hover:text-[#1a1a1a]"
                  : "text-[#ddd] border-transparent cursor-not-allowed"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
