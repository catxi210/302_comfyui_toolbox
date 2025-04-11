"use client";

import { WorkflowType } from "@/type";
import { WorkflowSelect } from "../workflow-select/workflow-select";
import {
  AnythingChangerForm,
  ClothesChangerForm,
  FaceSwapperForm,
  ImageToRealityForm,
  StyleTransferForm,
} from "@/components/forms/specific-form";

interface ImageTabContentProps {
  activeWorkflow: WorkflowType;
  onValueChange: (value: string) => void;
}

const WORKFLOW_CONTENT_MAP = new Map<WorkflowType, React.ReactNode>([
  ["clothes_changer", <ClothesChangerForm key="clothes_changer" />],
  ["face_swapper", <FaceSwapperForm key="face_swapper" />],
  ["anything_changer", <AnythingChangerForm key="anything_changer" />],
  ["image_to_reality", <ImageToRealityForm key="image_to_reality" />],
  ["style_transfer", <StyleTransferForm key="style_transfer" />],
]);

export function ImageTabContent({
  activeWorkflow,
  onValueChange,
}: ImageTabContentProps) {
  return (
    <div className="flex h-full flex-col gap-y-6">
      <WorkflowSelect
        onValueChange={onValueChange}
        defaultValue={activeWorkflow}
      />
      {WORKFLOW_CONTENT_MAP.get(activeWorkflow)}
    </div>
  );
}
