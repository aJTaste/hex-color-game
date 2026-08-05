// app/unge/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "運ゲー",
  description: "コイントスやサイコロなど、あらゆる運試しを集めたツール",
};

export default function UngeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
