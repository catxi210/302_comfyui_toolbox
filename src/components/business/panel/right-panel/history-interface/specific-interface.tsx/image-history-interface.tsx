"use client";

import { db } from "@/db";
import { useMonitorMessage } from "@/hooks/global/use-monitor-message";
import { WorkflowType } from "@/type";
import { useLiveQuery } from "dexie-react-hooks";
import { useTranslations } from "next-intl";
import { SingleCard } from "../../history-card/singe-card/single-card";
import { AnythingChangerTask, ClothesChangerTask, TaskType } from "@/db/type";
import { toast } from "sonner";
import { EmptyInterface } from "./empty-interface";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { videoModeFormStore } from "@/stores/slices/video_mode_form.store";
import { useIsMobile } from "@/hooks/global/use-mobile";

interface ImageHistoryInterfaceProps {
  activeWorkflow: WorkflowType;
  onVideoClick: () => void;
}

export function ImageHistoryInterface({
  activeWorkflow,
  onVideoClick,
}: ImageHistoryInterfaceProps) {
  const t = useTranslations("right_panel.history_interface");

  const isMobile = useIsMobile();

  const tasks = useLiveQuery(
    async () => await db.getTasksByWorkflow(activeWorkflow),
    [activeWorkflow]
  );

  const { handleDownload: _handleDownload } = useMonitorMessage();

  const [videoModeFormStore_, setVideoModeFormStore] =
    useAtom(videoModeFormStore);

  const handleVideoClick = (imageUrl: string) => {
    setVideoModeFormStore({
      ...videoModeFormStore_,
      imageFile: imageUrl,
    });
    onVideoClick();
  };

  const isDualCardLayout =
    activeWorkflow === "clothes_changer" ||
    activeWorkflow === "anything_changer";

  const getInputUrl = (
    task: TaskType
  ): { original: string; target: string } => {
    if ("sourceImageFile" in task.input) {
      return {
        original: task.input.sourceImageFile,
        target: task.input.targetImageFile,
      }; // AnythingChangerTask
    } else if ("modelImageFile" in task.input) {
      return {
        original: task.input.modelImageFile,
        target: task.input.clothesImageFile,
      }; // ClothesChangerTask
    } else if ("faceImageFile" in task.input) {
      return {
        original: task.input.faceImageFile,
        target: task.input.targetImageFile,
      }; // FaceSwapperTask
    } else if ("imageFile" in task.input) {
      return {
        original: task.input.imageFile,
        target: "",
      }; // ImageToRealityTask
    } else if ("oriImageFile" in task.input) {
      return {
        original: task.input.oriImageFile,
        target: task.input.refImageFile,
      }; // StyleTransferTask
    }
    return {
      original: "",
      target: "",
    };
  };

  const getResultUrl = (task: TaskType) => {
    if ("resultUrl" in task.output) {
      return task.output.resultUrl;
    } else if (task.output instanceof Array) {
      return task.output[0];
    }

    return "";
  };

  const handleDownloadClick = (task: TaskType) => {
    const timestamp = dayjs().valueOf().toString();

    if (isDualCardLayout) {
      const downloader = async (
        task: AnythingChangerTask | ClothesChangerTask
      ) => {
        Promise.all([
          _handleDownload(task.output.resultUrl, `resultUrl_${timestamp}.png`),
          _handleDownload(
            task.output.comparisonUrl,
            `comparisonUrl_${timestamp}.png`
          ),
        ]);
      };

      toast.promise(
        downloader(task as AnythingChangerTask | ClothesChangerTask),
        {
          loading: t("download_status.loading"),
          success: t("download_status.success"),
          error: t("download_status.error"),
        }
      );
    } else {
      toast.promise(
        _handleDownload(
          (task as Exclude<TaskType, AnythingChangerTask | ClothesChangerTask>)
            .output[0],
          `output_${timestamp}.png`
        ),
        {
          loading: t("download_status.loading"),
          success: t("download_status.success"),
          error: t("download_status.error"),
        }
      );
    }
  };

  const handleDeleteClick = async (task: TaskType) => {
    await db.updateTaskByWorkflow(activeWorkflow, task.id!, {
      isDeleted: true,
    });
  };

  if (!tasks || tasks.length === 0) {
    return <EmptyInterface />;
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 overflow-y-auto p-4">
        <div
          className={cn(
            `grid gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`
          )}
        >
          {tasks.map((task) => (
            <SingleCard
              key={task.id}
              taskId={task.taskId}
              workflowType={task.workflowType}
              inputUrl={getInputUrl(task)}
              resultUrl={getResultUrl(task)}
              createdAt={task.createdAt}
              taskStatus={task.status}
              onVideoClick={() => {
                handleVideoClick(getResultUrl(task));
              }}
              onDownloadClick={() => handleDownloadClick(task)}
              onDeleteClick={() => handleDeleteClick(task)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
