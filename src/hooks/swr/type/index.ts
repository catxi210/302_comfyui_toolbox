import { z } from "zod";

export interface PoolingConfigBase<T> {
  apiUrl: string;
  isSuccess: (response: T) => boolean;
  isFailed: (response: T) => boolean;
  onPolling: (response: T) => void | Promise<void>;
  onSuccess: (response: T) => void | Promise<void>;
  onFailed: (response: T) => void | Promise<void>;
  fetcher: (params: { apiUrl: string; taskId: string }) => Promise<T>;
}

const baseStatusSchema = z.object({
  code: z.number(),
  data: z.enum(["QUEUED", "RUNNING", "SUCCESS", "FAILED", "SUBMITTING"]),
  queue: z.number(),
});
export const clothesChangerStatusSchema = baseStatusSchema.extend({
  output: z.object({
    comparisonUrl: z.string(),
    resultUrl: z.string(),
  }),
});
export const faceSwapperStatusSchema = baseStatusSchema.extend({
  output: z.array(z.string()),
});
export const styleTransferStatusSchema = baseStatusSchema.extend({
  output: z.array(z.string()),
});
export const anythingChangerStatusSchema = baseStatusSchema.extend({
  output: z.object({
    comparisonUrl: z.string(),
    resultUrl: z.string(),
  }),
});
export const imageToRealityStatusSchema = baseStatusSchema.extend({
  output: z.array(z.string()),
});

export type ClothesChangerStatus = z.infer<typeof clothesChangerStatusSchema>;
export type FaceSwapperStatus = z.infer<typeof faceSwapperStatusSchema>;
export type StyleTransferStatus = z.infer<typeof styleTransferStatusSchema>;
export type AnythingChangerStatus = z.infer<typeof anythingChangerStatusSchema>;
export type ImageToRealityStatus = z.infer<typeof imageToRealityStatusSchema>;

export type StatusType =
  | ClothesChangerStatus
  | ImageToRealityStatus
  | FaceSwapperStatus
  | StyleTransferStatus
  | AnythingChangerStatus;

export type WorkflowHandlers = {
  apiUrl: string;
  getTask: (taskId: string) => Promise<any>;
  updateTask: (taskId: string, data: any) => Promise<any>;
  loggerPrefix: string;
};
