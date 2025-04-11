import { useCallback, useState } from "react";
import { UseFormWatch } from "react-hook-form";
import { createScopedLogger } from "@/utils";
import { db } from "@/db";
import {
  createClothesChangerTask,
  createClothesChangerUploadMaskTask,
} from "@/services/workflow";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { ClothesChangerFormType } from "@/components/forms/specific-form/clothes-changer/schema";
import { getImageSize, restoreToBinaryImage } from "./utils/image-utils";

const logger = createScopedLogger("useClothesChangerApi");

interface UseClothesChangerApiProps {
  getValues: UseFormWatch<ClothesChangerFormType>;
  validateForm: (formData: ClothesChangerFormType) => void;
}

export function useClothesChangerApi({
  getValues,
  validateForm,
}: UseClothesChangerApiProps) {
  const t = useTranslations("left_panel.hooks.use_api");

  const [isCreating, setIsCreating] = useState(false);

  const handleProcessTask = useCallback(async () => {
    if ((await db.getRunningTasksCount()) > 3) {
      toast.error(t("exceeding_concurrency limit"));

      return;
    }

    setIsCreating(true);

    const formData = getValues();
    logger.debug("useClothesChangerApi form data:", formData);

    validateForm(formData);

    const {
      mode,
      modelImageFile,
      clothesImageFile,
      modelImgSegLabels,
      clothesImgSegLabels,
      modelMaskLines,
      clothesMaskLines,
    } = formData;

    let taskId = "";
    try {
      if (mode === "label") {
        const formatedModelImgSegLabels = modelImgSegLabels.join(",");
        const formatedClothesImgSegLabels = clothesImgSegLabels.join(",");

        taskId = await createClothesChangerTask({
          modelImageFile: modelImageFile,
          clothesImageFile: clothesImageFile,
          modelImgSegLabels: formatedModelImgSegLabels,
          clothesImgSegLabels: formatedClothesImgSegLabels,
        });
      } else {
        const [modelMaskSize, clothesMaskSize] = await Promise.all([
          getImageSize(modelImageFile),
          getImageSize(clothesImageFile),
        ]);

        const modelMaskBinaryImage = restoreToBinaryImage(
          modelMaskLines,
          modelMaskSize
        );
        const clothesMaskBinaryImage = restoreToBinaryImage(
          clothesMaskLines,
          clothesMaskSize
        );

        taskId = await createClothesChangerUploadMaskTask({
          modelImageFile: modelImageFile,
          clothesImageFile: clothesImageFile,
          modelMaskFile: modelMaskBinaryImage,
          clothesMaskFile: clothesMaskBinaryImage,
        });
      }

      await db.addClothesChangerTask({
        taskId: taskId,
        workflowType: "clothes_changer",
        input: {
          mode: mode,
          modelImageFile: modelImageFile,
          clothesImageFile: clothesImageFile,
          modelImgSegLabels: modelImgSegLabels,
          clothesImgSegLabels: clothesImgSegLabels,
          modelMaskLines: modelMaskLines,
          clothesMaskLines: clothesMaskLines,
        },
        output: { comparisonUrl: "", resultUrl: "" },
        status: "SUBMITTING",
        attempt: 0,
        queuePosition: 0,
        isDeleted: false,
      });
    } catch (error) {
      logger.error("useClothesChangerApi error:", error);

      toast.error(t("error_occurred"));
    } finally {
      setIsCreating(false);
    }
  }, [getValues, t, validateForm]);

  return { isCreating, handleProcessTask };
}
