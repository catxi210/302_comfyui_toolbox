"use client";

import { TaskStatus } from "@/type";
import { useTranslations } from "next-intl";
import { StatusTagger } from "../statue-tagger/status-tagger";
import { HistoryCard } from "../history-card";
import { ActionGroup } from "../action-group/action-group";
import { useVideoModePollingConfig } from "@/hooks/swr/use-video-mode-polling-config";
import { useSWRPolling } from "@/hooks/swr/use-swr-polling";

interface SingleVideoCardProps {
  taskId: string;
  resultUrl: string;
  createdAt: string;
  taskStatus: TaskStatus;

  onDownloadClick: () => void;
  onDeleteClick: () => void;
}

export function SingleVideoCard({
  taskId,
  resultUrl,
  createdAt,
  taskStatus,

  onDownloadClick,
  onDeleteClick,
}: SingleVideoCardProps) {
  const t = useTranslations("right_panel.single_video_card");

  const { pollingConfig } = useVideoModePollingConfig({ taskId });
  useSWRPolling({ taskId, config: pollingConfig!, taskStatus });

  return (
    <div className="flex flex-col gap-y-2">
      <StatusTagger taskStatus={taskStatus} />

      <HistoryCard
        label={t("result")}
        mediaUrl={resultUrl}
        mediaType="video"
        taskStatus={taskStatus}
      />

      <div className="flex flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground">{createdAt}</p>

        <ActionGroup
          onVideoClick={() => {}}
          onDownloadClick={onDownloadClick}
          onDeleteClick={onDeleteClick}
          isShowVideo={false}
          isShowDownload={taskStatus === "SUCCESS"}
          isShowDelete={taskStatus === "SUCCESS" || taskStatus === "FAILED"}
        />
      </div>
    </div>
  );
}
