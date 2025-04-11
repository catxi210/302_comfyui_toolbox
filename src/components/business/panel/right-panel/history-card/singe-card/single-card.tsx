"use client";

import { useTranslations } from "next-intl";
import { ActionGroup } from "../action-group/action-group";
import { HistoryCard } from "../history-card";
import { StatusTagger } from "../statue-tagger/status-tagger";
import { TaskStatus, WorkflowType } from "@/type";
import { usePollingConfig } from "@/hooks/swr/use-polling-config";
import { useSWRPolling } from "@/hooks/swr/use-swr-polling";

interface SingleCardProps {
  taskId: string;
  workflowType: WorkflowType;
  inputUrl?: { original: string; target: string };
  resultUrl: string;
  createdAt: string;
  taskStatus: TaskStatus;

  onVideoClick: () => void;
  onDownloadClick: () => void;
  onDeleteClick: () => void;
}

export function SingleCard({
  taskId,
  workflowType,
  inputUrl,
  resultUrl,
  createdAt,
  taskStatus,

  onVideoClick,
  onDownloadClick,
  onDeleteClick,
}: SingleCardProps) {
  const t = useTranslations("right_panel.single_card");

  const { pollingConfig } = usePollingConfig({ taskId, workflowType });

  useSWRPolling({ taskId, config: pollingConfig!, taskStatus });

  return (
    <div className="flex flex-col gap-y-2">
      <StatusTagger taskStatus={taskStatus} />

      <HistoryCard
        label={t("result")}
        inputUrl={inputUrl}
        mediaUrl={resultUrl}
        mediaType="image"
        taskStatus={taskStatus}
      />

      <div className="flex flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground">{createdAt}</p>

        <ActionGroup
          onVideoClick={onVideoClick}
          onDownloadClick={onDownloadClick}
          onDeleteClick={onDeleteClick}
          isShowVideo={taskStatus === "SUCCESS"}
          isShowDownload={taskStatus === "SUCCESS"}
          isShowDelete={taskStatus === "SUCCESS" || taskStatus === "FAILED"}
        />
      </div>
    </div>
  );
}
