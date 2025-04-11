import { apiKy } from "@/api";
import { db } from "@/db";
import { createScopedLogger } from "@/utils";
import { z } from "zod";

export const videoModeStatusSchema = z.object({
  data: z.object({
    status: z.number(),
    works: z.array(
      z.object({
        resource: z.object({
          resource: z.string(),
        }),
      })
    ),
  }),
  message: z.string(),
});
export type VideoModeStatus = z.infer<typeof videoModeStatusSchema>;
const GET_KLING_TASK_STATUS_URL = "klingai/task/{id}/fetch";

export interface VideoModePollingConfigProps {
  taskId: string;
}

const logger = createScopedLogger("useVideoModePollingConfig");

export function useVideoModePollingConfig({
  taskId,
}: VideoModePollingConfigProps) {
  const pollingConfig = {
    apiUrl: GET_KLING_TASK_STATUS_URL,
    isSuccess: (response: VideoModeStatus) => response.data.status === 99,
    isFailed: (response: VideoModeStatus) => response.message === "失败",
    onPolling: async (response: VideoModeStatus) => {
      const pollingTask = await db.getVideoModeTask(taskId);
      await db.updateVideoModeTask(taskId, {
        status: "RUNNING",
        attempt: pollingTask.attempt + 1,
      });
      logger.debug("Video mode task polling:", response);
    },
    onSuccess: async (response: VideoModeStatus) => {
      await db.updateVideoModeTask(taskId, {
        status: "SUCCESS",
        output: response.data.works[0].resource.resource,
      });
      logger.debug("Video mode task success:", response);
    },
    onFailed: async (_response: VideoModeStatus) => {
      await db.updateVideoModeTask(taskId, {
        status: "FAILED",
      });
      logger.debug("Video mode task failed");
    },
    fetcher: async (params: { apiUrl: string; taskId: string }) => {
      const { apiUrl, taskId } = params;
      return await apiKy
        .get(apiUrl.replace("{id}", taskId))
        .json<VideoModeStatus>();
    },
  };

  return {
    pollingConfig,
  };
}
