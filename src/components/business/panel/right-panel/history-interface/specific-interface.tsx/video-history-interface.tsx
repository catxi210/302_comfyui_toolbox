"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { SingleVideoCard } from "../../history-card/singe-card/singe-video-card";
import { db } from "@/db";
import { EmptyInterface } from "./empty-interface";
import { useCallback } from "react";
import { VideoModeTask } from "@/db/type";
import { useMonitorMessage } from "@/hooks/global/use-monitor-message";
import { useTranslations } from "next-intl";
import { createScopedLogger } from "@/utils";
import { toast } from "sonner";
import dayjs from "dayjs";
import { useIsMobile } from "@/hooks/global/use-mobile";
import { cn } from "@/lib/utils";

const logger = createScopedLogger("VideoHistoryInterface");

export function VideoHistoryInterface() {
  const t = useTranslations("right_panel.history_interface");

  const tasks = useLiveQuery(async () => await db.getVideoModeTasks(), []);

  const { handleDownload } = useMonitorMessage();
  const isMobile = useIsMobile();

  const handleDownloadClick = useCallback(
    (task: VideoModeTask) => {
      const videoUrl = task.output;
      if (!videoUrl) {
        logger.error("output is undefined");
        return;
      }
      const timestamp = dayjs().valueOf().toString();
      toast.promise(handleDownload(videoUrl, `video_${timestamp}.mp4`), {
        loading: t("download_status.loading"),
        success: t("download_status.success"),
        error: t("download_status.error"),
      });

      logger.debug("Download cover image success");
    },
    [handleDownload, t]
  );

  const handleDeleteClick = useCallback(async (task: VideoModeTask) => {
    await db.updateVideoModeTask(task.taskId, {
      isDeleted: true,
    });
  }, []);

  if (!tasks || tasks.length === 0) {
    return <EmptyInterface />;
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 overflow-y-auto p-4">
        <div
          className={cn("grid gap-6", isMobile ? "grid-cols-1" : "grid-cols-3")}
        >
          {tasks.map((task) => (
            <SingleVideoCard
              key={task.id}
              taskId={task.taskId}
              resultUrl={task.output}
              createdAt={task.createdAt}
              taskStatus={task.status}
              onDownloadClick={() => handleDownloadClick(task)}
              onDeleteClick={() => handleDeleteClick(task)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
