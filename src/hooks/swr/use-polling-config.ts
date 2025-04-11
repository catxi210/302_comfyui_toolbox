/* eslint-disable camelcase */

import { db } from "@/db";
import { StatusType, WorkflowHandlers, PoolingConfigBase } from "./type";
import { createScopedLogger } from "@/utils";
import { apiKy } from "@/api";
import { WorkflowType } from "@/type";

const logger = createScopedLogger("usePollingConfig");

const API_URL_MAP: Record<WorkflowType, string> = {
  clothes_changer: "302/comfyui/clothes-changer/check-task-status",
  image_to_reality: "302/comfyui/image-to-reality/check-task-status",
  face_swapper: "302/comfyui/face-swapper/check-task-status",
  style_transfer: "302/comfyui/style-transfer/check-task-status",
  anything_changer: "302/comfyui/anything-changer/check-task-status",
};

const workflowHandlerMap: Record<WorkflowType, WorkflowHandlers> = {
  clothes_changer: {
    apiUrl: API_URL_MAP.clothes_changer,
    getTask: db.getClothesChangerTask.bind(db),
    updateTask: db.updateClothesChangerTask.bind(db),
    loggerPrefix: "Clothes Changer",
  },
  image_to_reality: {
    apiUrl: API_URL_MAP.image_to_reality,
    getTask: db.getImageToRealityTask.bind(db),
    updateTask: db.updateImageToRealityTask.bind(db),
    loggerPrefix: "Image to Reality",
  },
  face_swapper: {
    apiUrl: API_URL_MAP.face_swapper,
    getTask: db.getFaceSwapperTask.bind(db),
    updateTask: db.updateFaceSwapperTask.bind(db),
    loggerPrefix: "Face Swapper",
  },
  style_transfer: {
    apiUrl: API_URL_MAP.style_transfer,
    getTask: db.getStyleTransferTask.bind(db),
    updateTask: db.updateStyleTransferTask.bind(db),
    loggerPrefix: "Style Transfer",
  },
  anything_changer: {
    apiUrl: API_URL_MAP.anything_changer,
    getTask: db.getAnythingChangerTask.bind(db),
    updateTask: db.updateAnythingChangerTask.bind(db),
    loggerPrefix: "Anything Changer",
  },
};

export interface PollingConfigProps {
  workflowType: WorkflowType;
  taskId: string;
}

function createGenericHandlers(workflowType: WorkflowType, taskId: string) {
  const handlers = workflowHandlerMap[workflowType];
  if (!handlers) return null;

  return {
    apiUrl: handlers.apiUrl,
    handlePolling: async (response: StatusType) => {
      const pollingTask = await handlers.getTask(taskId);
      await handlers.updateTask(taskId, {
        status: response.data,
        attempt: pollingTask.attempt + 1,
      });
      logger.debug(`${handlers.loggerPrefix} task polling:`, response);
    },
    handleSuccess: async (response: StatusType) => {
      await handlers.updateTask(taskId, {
        output: response.output,
        status: response.data,
      });
      logger.debug(`${handlers.loggerPrefix} task success:`, response);
    },
    handleFailed: async (response: StatusType) => {
      await handlers.updateTask(taskId, {
        status: response.data ?? "FAILED",
      });
      logger.debug(`${handlers.loggerPrefix} task failed`);
    },
    fetcher: async (params: { apiUrl: string; taskId: string }) => {
      const { apiUrl, taskId } = params;
      return await apiKy
        .get(apiUrl, { searchParams: { taskId } })
        .json<StatusType>();
    },
  };
}

export function usePollingConfig({ workflowType, taskId }: PollingConfigProps) {
  const handlers = createGenericHandlers(workflowType, taskId);

  if (!handlers) return { pollingConfig: null };

  const pollingConfig: PoolingConfigBase<StatusType> = {
    apiUrl: handlers.apiUrl,
    isSuccess: (response) => response.data === "SUCCESS",
    isFailed: (response) => response.data === "FAILED",
    onPolling: handlers.handlePolling,
    onSuccess: handlers.handleSuccess,
    onFailed: handlers.handleFailed,
    fetcher: handlers.fetcher,
  };

  return { pollingConfig: pollingConfig };
}
