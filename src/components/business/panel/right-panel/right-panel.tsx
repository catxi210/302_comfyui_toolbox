"use client";

import { HistoryInterface } from "./history-interface/history-interface";

export function RightPanel() {
  return (
    <div className="flex h-full w-full flex-col gap-y-6">
      <HistoryInterface />
    </div>
  );
}
