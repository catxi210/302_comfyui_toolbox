import { AnythingChangerTask } from "./specific-type/anything-changer.type";
import { ClothesChangerTask } from "./specific-type/clothes-changer.type";
import { FaceSwapperTask } from "./specific-type/face-swapper.type";
import { ImageToRealityTask } from "./specific-type/image-to-reality.type";
import { StyleTransferTask } from "./specific-type/style-transfer.type";
import { BaseType } from "./specific-type/base.type";
import { VideoModeTask } from "./video-mode.type";

export type {
  AnythingChangerTask,
  ClothesChangerTask,
  FaceSwapperTask,
  ImageToRealityTask,
  StyleTransferTask,
  VideoModeTask,
};

export type TaskType =
  | AnythingChangerTask
  | ClothesChangerTask
  | FaceSwapperTask
  | ImageToRealityTask
  | StyleTransferTask;

export type TaskStatus = BaseType["status"];
