"use client";

import dynamic from "next/dynamic";

// Lazy load snow effect to reduce initial bundle and improve LCP
const ChristmasSnowLazy = dynamic(
  () =>
    import("@/components/effects/christmas-snow").then((mod) => ({
      default: mod.ChristmasSnow,
    })),
  { ssr: false, loading: () => null },
);

export function ChristmasSnowWrapper() {
  return <ChristmasSnowLazy />;
}
