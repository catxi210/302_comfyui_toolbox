import { FaceSwapperFormType } from "@/components/forms/specific-form/face-swapper/schema";
import { db } from "@/db";
import { createFaceSwapperTask } from "@/services/workflow";
import { createScopedLogger } from "@/utils";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { UseFormWatch } from "react-hook-form";
import { toast } from "sonner";

const logger = createScopedLogger("useFaceSwapperApi");

interface UseFaceSwapperApiProps {
  getValues: UseFormWatch<FaceSwapperFormType>;
  validateForm: (formData: FaceSwapperFormType) => void;
}

export function useFaceSwapperApi({
  getValues,
  validateForm,
}: UseFaceSwapperApiProps) {
  const t = useTranslations("left_panel.hooks.use_api");

  const [isCreating, setIsCreating] = useState(false);

  const handleProcessTask = useCallback(async () => {
    if ((await db.getRunningTasksCount()) > 3) {
      toast.error(t("exceeding_concurrency limit"));

      return;
    }

    setIsCreating(true);

    const formData = getValues();
    logger.debug("useImageToRealityApi form data:", formData);

    validateForm(formData);

    const { faceImageFile, targetImageFile, filmFilter } = formData;

    try {
      const taskId = await createFaceSwapperTask({
        faceImageFile: faceImageFile,
        targetImageFile: targetImageFile,
        filmFilter: filmFilter,
      });

      await db.addFaceSwapperTask({
        taskId: taskId,
        workflowType: "face_swapper",
        input: {
          faceImageFile: faceImageFile,
          targetImageFile: targetImageFile,
          filmFilter: filmFilter,
        },
        output: [],
        status: "SUBMITTING",
        attempt: 0,
        queuePosition: 0,
        isDeleted: false,
      });
    } catch (error) {
      logger.error("useFaceSwapperApi error:", error);

      toast.error(t("error_occurred"));
    } finally {
      setIsCreating(false);
    }
  }, [getValues, t, validateForm]);

  return { isCreating, handleProcessTask };
}
