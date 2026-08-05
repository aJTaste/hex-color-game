// app/masu-guesser/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MasuGuesser",
  description: "チェスの代数式表記法から瞬時にマスを見つける練習ゲーム",
};

export default function MasuGuesserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
