/* eslint-disable camelcase */
import Dexie, { Table, UpdateSpec } from "dexie";
import dayjs from "dayjs";
import {
  AnythingChangerTask,
  ClothesChangerTask,
  FaceSwapperTask,
  ImageToRealityTask,
  StyleTransferTask,
  VideoModeTask,
  TaskType,
} from "./type";
import { TaskStatus, WorkflowType } from "@/type";

export class ComfyUiToolDB extends Dexie {
  anythingChanger!: Table<AnythingChangerTask, number>;
  clothesChanger!: Table<ClothesChangerTask, number>;
  faceSwapper!: Table<FaceSwapperTask, number>;
  imageToReality!: Table<ImageToRealityTask, number>;
  styleTransfer!: Table<StyleTransferTask, number>;
  videoMode!: Table<VideoModeTask, number>;

  constructor() {
    super("ComfyToolDB");
    this.version(1).stores({
      anythingChanger:
        "++id, taskId, status, queuePosition, createdAt, updatedAt, isDeleted",
      clothesChanger:
        "++id, taskId, status, queuePosition, createdAt, updatedAt, isDeleted",
      faceSwapper:
        "++id, taskId, status, queuePosition, createdAt, updatedAt, isDeleted",
      imageToReality:
        "++id, taskId, status, queuePosition, createdAt, updatedAt, isDeleted",
      styleTransfer:
        "++id, taskId, status, queuePosition, createdAt, updatedAt, isDeleted",
      videoMode:
        "++id, taskId, status, queuePosition, createdAt, updatedAt, isDeleted",
    });
  }

  async add<T extends { createdAt: string; updatedAt: string }>(
    table: Table<T, number>,
    data: Omit<T, "id" | "createdAt" | "updatedAt">
  ): Promise<number> {
    const now = dayjs().format("YYYY/MM/DD HH:mm:ss");
    const fullData = {
      ...data,
      createdAt: now,
      updatedAt: now,
    } as T;
    return await table.add(fullData);
  }

  async update<T extends { updatedAt: string }>(
    table: Table<T, number>,
    id: number,
    data: Partial<T>
  ): Promise<number> {
    await table.update(id, {
      ...data,
      updatedAt: dayjs().format("YYYY/MM/DD HH:mm:ss"),
    } as UpdateSpec<T>);
    return id;
  }

  async softDelete(table: Table<any, number>, id: number): Promise<void> {
    await this.update(table, id, { isDeleted: true });
  }

  async get<T>(table: Table<T, number>, id: number): Promise<T | undefined> {
    return await table.get(id);
  }

  private getTableByWorkflow<T extends TaskType>(
    workflow: WorkflowType
  ): Table<T, number> {
    const tableMap: Record<WorkflowType, Table<any, number>> = {
      anything_changer: this.anythingChanger,
      clothes_changer: this.clothesChanger,
      face_swapper: this.faceSwapper,
      image_to_reality: this.imageToReality,
      style_transfer: this.styleTransfer,
    };
    return tableMap[workflow] as Table<T, number>;
  }

  async getTasksByWorkflow<T extends TaskType>(
    workflow: WorkflowType
  ): Promise<T[]> {
    const table = this.getTableByWorkflow<T>(workflow);
    return await table
      .filter((task) => !task.isDeleted)
      .reverse()
      .toArray();
  }

  async updateTaskByWorkflow(
    workflow: WorkflowType,
    id: number,
    data: Partial<TaskType>
  ): Promise<number> {
    const table = this.getTableByWorkflow(workflow);
    return await this.update(table, id, data);
  }

  async getRunningTasksCount(): Promise<number> {
    const statusFilter = (status: TaskStatus) =>
      ["RUNNING", "QUEUED", "SUBMITTING"].includes(status);
    const runningTasks = await Promise.all([
      this.anythingChanger
        .orderBy("createdAt")
        .reverse()
        .limit(10)
        .filter((task) => statusFilter(task.status))
        .count(),
      this.clothesChanger
        .orderBy("createdAt")
        .reverse()
        .limit(10)
        .filter((task) => statusFilter(task.status))
        .count(),
      this.faceSwapper
        .orderBy("createdAt")
        .reverse()
        .limit(10)
        .filter((task) => statusFilter(task.status))
        .count(),
      this.imageToReality
        .orderBy("createdAt")
        .reverse()
        .limit(10)
        .filter((task) => statusFilter(task.status))
        .count(),
      this.styleTransfer
        .orderBy("createdAt")
        .reverse()
        .limit(10)
        .filter((task) => statusFilter(task.status))
        .count(),
      this.videoMode
        .orderBy("createdAt")
        .reverse()
        .limit(10)
        .filter((task) => statusFilter(task.status))
        .count(),
    ]);

    return runningTasks.reduce((acc, count) => acc + count, 0);
  }

  async addTask<T extends TaskType>(
    workflow: WorkflowType,
    data: Omit<T, "id" | "createdAt" | "updatedAt">
  ): Promise<number> {
    const table = this.getTableByWorkflow(workflow);
    return await this.add(table, data);
  }

  async updateTaskById<T extends TaskType>(
    workflow: WorkflowType,
    taskId: string,
    data: Partial<T>
  ): Promise<number> {
    const table = this.getTableByWorkflow(workflow);
    const task = await table.where("taskId").equals(taskId).first();
    if (!task || typeof task.id !== "number") {
      throw new Error(`Task with taskId ${taskId} not found or has invalid id`);
    }
    return await this.update(table, task.id, data);
  }

  async getTaskById<T extends TaskType>(
    workflow: WorkflowType,
    taskId: string
  ): Promise<T> {
    const table = this.getTableByWorkflow(workflow);
    const task = await table.where("taskId").equals(taskId).first();
    if (!task) {
      throw new Error(`Task with taskId ${taskId} not found`);
    }
    return task as T;
  }

  // AnythingChanger
  async addAnythingChangerTask(
    data: Omit<AnythingChangerTask, "id" | "createdAt" | "updatedAt">
  ): Promise<number> {
    return this.addTask<AnythingChangerTask>("anything_changer", data);
  }
  async updateAnythingChangerTask(
    taskId: string,
    data: Partial<AnythingChangerTask>
  ): Promise<number> {
    return this.updateTaskById<AnythingChangerTask>(
      "anything_changer",
      taskId,
      data
    );
  }
  async getAnythingChangerTask(taskId: string): Promise<AnythingChangerTask> {
    return this.getTaskById<AnythingChangerTask>("anything_changer", taskId);
  }

  // ClothesChanger
  async addClothesChangerTask(
    data: Omit<ClothesChangerTask, "id" | "createdAt" | "updatedAt">
  ): Promise<number> {
    return this.addTask<ClothesChangerTask>("clothes_changer", data);
  }
  async updateClothesChangerTask(
    taskId: string,
    data: Partial<ClothesChangerTask>
  ): Promise<number> {
    return this.updateTaskById<ClothesChangerTask>(
      "clothes_changer",
      taskId,
      data
    );
  }
  async getClothesChangerTask(taskId: string): Promise<ClothesChangerTask> {
    return this.getTaskById<ClothesChangerTask>("clothes_changer", taskId);
  }

  // FaceSwapper
  async addFaceSwapperTask(
    data: Omit<FaceSwapperTask, "id" | "createdAt" | "updatedAt">
  ): Promise<number> {
    return this.addTask<FaceSwapperTask>("face_swapper", data);
  }
  async updateFaceSwapperTask(
    taskId: string,
    data: Partial<FaceSwapperTask>
  ): Promise<number> {
    return this.updateTaskById<FaceSwapperTask>("face_swapper", taskId, data);
  }
  async getFaceSwapperTask(taskId: string): Promise<FaceSwapperTask> {
    return this.getTaskById<FaceSwapperTask>("face_swapper", taskId);
  }

  // ImageToReality
  async addImageToRealityTask(
    data: Omit<ImageToRealityTask, "id" | "createdAt" | "updatedAt">
  ): Promise<number> {
    return this.addTask<ImageToRealityTask>("image_to_reality", data);
  }
  async updateImageToRealityTask(
    taskId: string,
    data: Partial<ImageToRealityTask>
  ): Promise<number> {
    return this.updateTaskById<ImageToRealityTask>(
      "image_to_reality",
      taskId,
      data
    );
  }
  async getImageToRealityTask(taskId: string): Promise<ImageToRealityTask> {
    return this.getTaskById<ImageToRealityTask>("image_to_reality", taskId);
  }

  // StyleTransfer
  async addStyleTransferTask(
    data: Omit<StyleTransferTask, "id" | "createdAt" | "updatedAt">
  ): Promise<number> {
    return this.addTask<StyleTransferTask>("style_transfer", data);
  }
  async updateStyleTransferTask(
    taskId: string,
    data: Partial<StyleTransferTask>
  ): Promise<number> {
    return this.updateTaskById<StyleTransferTask>(
      "style_transfer",
      taskId,
      data
    );
  }
  async getStyleTransferTask(taskId: string): Promise<StyleTransferTask> {
    return this.getTaskById<StyleTransferTask>("style_transfer", taskId);
  }

  // VideoMode
  async addVideoModeTask(
    data: Omit<VideoModeTask, "id" | "createdAt" | "updatedAt">
  ): Promise<number> {
    return this.add(this.videoMode, data);
  }
  async updateVideoModeTask(
    taskId: string,
    data: Partial<VideoModeTask>
  ): Promise<number> {
    const task = await this.videoMode.where("taskId").equals(taskId).first();
    if (!task) {
      throw new Error(`Task with taskId ${taskId} not found or has invalid id`);
    }
    return this.update(this.videoMode, task.id!, data);
  }
  async getVideoModeTask(taskId: string): Promise<VideoModeTask> {
    const task = await this.videoMode.where("taskId").equals(taskId).first();
    if (!task) {
      throw new Error(`Task with taskId ${taskId} not found or has invalid id`);
    }
    return task;
  }
  async getVideoModeTasks(): Promise<VideoModeTask[]> {
    const table = this.videoMode;
    return await table
      .filter((task) => !task.isDeleted)
      .reverse()
      .toArray();
  }
}

export const db = new ComfyUiToolDB();
