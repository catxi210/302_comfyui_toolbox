import { ImageToRealityFormType } from "@/components/forms/specific-form/image-to-reality/schema";
import { useCallback, useState } from "react";
import { UseFormWatch } from "react-hook-form";
import { createScopedLogger } from "@/utils";
import { db } from "@/db";
import { createImageToRealityTask } from "@/services/workflow";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const logger = createScopedLogger("useImageToRealityApi");

interface UseImageToRealityApiProps {
  getValues: UseFormWatch<ImageToRealityFormType>;
  validateForm: (formData: ImageToRealityFormType) => void;
}

export function useImageToRealityApi({
  getValues,
  validateForm,
}: UseImageToRealityApiProps) {
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

    const { imageFile, targetType } = formData;

    try {
      const taskId = await createImageToRealityTask({
        imageFileUrl: imageFile,
        targetType: targetType,
      });

      await db.addImageToRealityTask({
        taskId: taskId,
        workflowType: "image_to_reality",
        input: {
          imageFile: imageFile,
          targetType: targetType,
        },
        output: [],
        status: "SUBMITTING",
        attempt: 0,
        queuePosition: 0,
        isDeleted: false,
      });
    } catch (error) {
      logger.error("useImageToRealityApi error:", error);

      toast.error(t("error_occurred"));
    } finally {
      setIsCreating(false);
    }
  }, [getValues, t, validateForm]);

  return { isCreating, handleProcessTask };
}
