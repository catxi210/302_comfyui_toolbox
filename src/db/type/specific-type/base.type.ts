import { TaskStatus, WorkflowType } from "@/type";

export interface BaseType {
  id?: number;
  taskId: string;
  workflowType: WorkflowType;
  status: TaskStatus;
  attempt: number;
  queuePosition: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}
