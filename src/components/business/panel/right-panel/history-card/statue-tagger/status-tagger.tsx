"use client";

import { cn } from "@/lib/utils";
import { TaskStatus } from "@/type";
import { useTranslations } from "next-intl";

interface StatusTaggerProps {
  taskStatus: TaskStatus;
  className?: string;
}

export function StatusTagger({ taskStatus, className }: StatusTaggerProps) {
  const t = useTranslations("right_panel.history_card.status_tagger");

  const taggerConfig = {
    QUEUED: {
      text: t("queued"),
      color: "bg-blue-600",
    },
    RUNNING: {
      text: t("running"),
      color: "bg-yellow-400",
    },
    SUCCESS: {
      text: t("success"),
      color: "bg-green-600",
    },
    FAILED: {
      text: t("failed"),
      color: "bg-destructive",
    },
    SUBMITTING: {
      text: t("submitting"),
      color: "bg-[#46B1C9]",
    },
  };

  const config = taggerConfig[taskStatus];

  return (
    <div
      className={cn(
        `w-fit ${config.color} rounded-md px-2 py-0.5 text-xs text-white backdrop-blur`,
        className
      )}
    >
      <p className="px-4 py-1">{config.text}</p>
    </div>
  );
}
