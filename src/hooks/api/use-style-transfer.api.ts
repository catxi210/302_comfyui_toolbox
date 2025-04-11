import { useCallback, useState } from "react";
import { UseFormWatch } from "react-hook-form";
import { createScopedLogger } from "@/utils";
import { db } from "@/db";
import { createStyleTransferTask } from "@/services/workflow";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { StyleTransferFormType } from "@/components/forms/specific-form/style-transfer/schema";

const logger = createScopedLogger("useStyleTransferApi");

interface UseStyleTransferApiProps {
  getValues: UseFormWatch<StyleTransferFormType>;
  validateForm: (formData: StyleTransferFormType) => void;
}

export function useStyleTransferApi({
  getValues,
  validateForm,
}: UseStyleTransferApiProps) {
  const t = useTranslations("left_panel.hooks.use_api");

  const [isCreating, setIsCreating] = useState(false);

  const handleProcessTask = useCallback(async () => {
    if ((await db.getRunningTasksCount()) > 3) {
      toast.error(t("exceeding_concurrency limit"));

      return;
    }

    setIsCreating(true);

    const formData = getValues();
    logger.debug("useStyleTransferApi form data:", formData);

    validateForm(formData);

    const { oriImageFile, refImageFile } = formData;

    try {
      const taskId = await createStyleTransferTask({
        oriImageFile: oriImageFile,
        refImageFile: refImageFile,
      });

      await db.addStyleTransferTask({
        taskId: taskId,
        workflowType: "style_transfer",
        input: {
          oriImageFile: oriImageFile,
          refImageFile: refImageFile,
        },
        output: [],
        status: "SUBMITTING",
        attempt: 0,
        queuePosition: 0,
        isDeleted: false,
      });
    } catch (error) {
      logger.error("useStyleTransferApi error:", error);

      toast.error(t("error_occurred"));
    } finally {
      setIsCreating(false);
    }
  }, [getValues, t, validateForm]);

  return { isCreating, handleProcessTask };
}
