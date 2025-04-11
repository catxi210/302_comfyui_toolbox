import { useCallback, useState } from "react";
import { UseFormWatch } from "react-hook-form";
import { createScopedLogger } from "@/utils";
import { db } from "@/db";
import {
  createAnythingChangerTask,
  createAnythingChangerUploadMaskTask,
} from "@/services/workflow";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { AnythingChangerFormType } from "@/components/forms/specific-form/anything-changer/schema";
import { getImageSize, restoreToBinaryImage } from "./utils/image-utils";

const logger = createScopedLogger("useAnythingChangerApi");

interface UseAnythingChangerApiProps {
  getValues: UseFormWatch<AnythingChangerFormType>;
  validateForm: (formData: AnythingChangerFormType) => void;
}

export function useAnythingChangerApi({
  getValues,
  validateForm,
}: UseAnythingChangerApiProps) {
  const t = useTranslations("left_panel.hooks.use_api");

  const [isCreating, setIsCreating] = useState(false);

  const handleProcessTask = useCallback(async () => {
    if ((await db.getRunningTasksCount()) > 3) {
      toast.error(t("exceeding_concurrency limit"));

      return;
    }

    setIsCreating(true);

    const formData = getValues();
    logger.debug("useAnythingChangerApi form data:", formData);

    validateForm(formData);

    const {
      mode,
      sourceImageFile,
      targetImageFile,
      sourceDescription,
      targetDescription,
      sourceMaskLines,
      targetMaskLines,
      smallObject,
    } = formData;

    let taskId = "";
    try {
      if (mode === "description") {
        taskId = await createAnythingChangerTask({
          sourceImageFile: sourceImageFile,
          targetImageFile: targetImageFile,
          sourceDescription: sourceDescription,
          targetDescription: targetDescription,
          smallObject: smallObject,
        });
      } else {
        const [sourceMaskSize, targetMaskSize] = await Promise.all([
          getImageSize(sourceImageFile),
          getImageSize(targetImageFile),
        ]);

        const sourceMaskBinaryImage = restoreToBinaryImage(
          sourceMaskLines,
          sourceMaskSize
        );
        const targetMaskBinaryImage = restoreToBinaryImage(
          targetMaskLines,
          targetMaskSize
        );

        taskId = await createAnythingChangerUploadMaskTask({
          sourceImageFile: sourceImageFile,
          targetImageFile: targetImageFile,
          sourceMaskLines: sourceMaskBinaryImage,
          targetMaskLines: targetMaskBinaryImage,
          smallObject: smallObject,
        });
      }

      await db.addAnythingChangerTask({
        taskId: taskId,
        workflowType: "anything_changer",
        input: {
          mode: mode,
          sourceImageFile: sourceImageFile,
          targetImageFile: targetImageFile,
          sourceDescription: sourceDescription,
          targetDescription: targetDescription,
          sourceMaskLines: sourceMaskLines,
          targetMaskLines: targetMaskLines,
          smallObject: smallObject,
        },
        output: { comparisonUrl: "", resultUrl: "" },
        status: "SUBMITTING",
        attempt: 0,
        queuePosition: 0,
        isDeleted: false,
      });
    } catch (error) {
      logger.error("useAnythingChangerApi error:", error);

      toast.error(t("error_occurred"));
    } finally {
      setIsCreating(false);
    }
  }, [getValues, t, validateForm]);

  return { isCreating, handleProcessTask };
}
