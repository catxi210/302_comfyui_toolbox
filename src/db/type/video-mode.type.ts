export interface VideoModeTask {
  id?: number;
  taskId: string;
  status: "QUEUED" | "RUNNING" | "SUCCESS" | "FAILED";
  attempt: number;
  queuePosition: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  input: {
    imageFile: string;
    cameraLanguage: string;
    expression: string;
    emotion: string;
    industry: string;
    actions: string[];
    restrictiveWords: string[];
    optimization: boolean;
    resolution: string;
    extraRequest?: string;
  };
  output: string;
}
