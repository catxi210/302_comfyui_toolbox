import { createScopedLogger } from "@/utils";
import { PoolingConfigBase } from "./type";
import { useState } from "react";
import useSWR from "swr";
import { TaskStatus } from "@/type";

interface UseSWRPollingProps<T> {
  taskId: string;
  config: PoolingConfigBase<T>;
  taskStatus: TaskStatus;
}

const logger = createScopedLogger("useSWRPolling");

const POLLING_INTERVAL = 5000;
const MAX_RETRY_COUNT = 3;
const SERVER_ERROR = "Server error";
const TASK_FAILED_ERROR = "Task failed";

export function useSWRPolling<T>({
  taskId,
  config,
  taskStatus,
}: UseSWRPollingProps<T>) {
  const [isPolling, setIsPolling] = useState(false);

  const canStartPolling = ["QUEUED", "RUNNING", "SUBMITTING"].includes(
    taskStatus
  );

  const fetcher = async (apiUrl: string, taskId: string) => {
    try {
      let respone;
      try {
        respone = await config.fetcher({ apiUrl, taskId });
      } catch (error) {
        logger.error("Fetching error:", error);
        throw new Error(SERVER_ERROR);
      }

      if (config.isFailed(respone)) {
        throw new Error(TASK_FAILED_ERROR);
      }

      return respone;
    } catch (error) {
      logger.error("Polling error:", error);
      throw error;
    }
  };

  useSWR(
    canStartPolling ? [config.apiUrl, taskId] : null,
    ([apiUrl, taskId]) => fetcher(apiUrl, taskId),
    {
      refreshInterval: (latestData: any) =>
        latestData && config.isSuccess(latestData) ? 0 : POLLING_INTERVAL,
      onSuccess: (data) => {
        if (config.isSuccess(data)) {
          setIsPolling(false);
          config.onSuccess(data);

          return;
        }
        config.onPolling(data);
      },
      onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
        logger.debug("retryCount", retryCount);

        if (
          error.message === TASK_FAILED_ERROR ||
          retryCount >= MAX_RETRY_COUNT
        ) {
          logger.error(
            "task failded: ",
            retryCount >= MAX_RETRY_COUNT
              ? "Exceeding the maximum number of retries"
              : error.message
          );

          setIsPolling(false);
          config.onFailed(error);

          return;
        }

        setTimeout(
          () => revalidate({ retryCount }),
          Math.min(1000 * 2 ** retryCount, 30000)
        );
      },
    }
  );

  return {
    isPolling,
    setIsPolling,
  };
}
