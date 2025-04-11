"use client";

import { ImageUploader } from "@/components/business/image-uploader/image-uploader";
import { LoaderRenderer } from "@/components/common/loader-renderer";
import { Button } from "@/components/ui/button";
import { useStyleTransferForm } from "@/hooks/form/use-style-transfer.form";
import { styleTransferFormStore } from "@/stores/slices/style_transfer_form.store";
import { createScopedLogger } from "@/utils";
import { useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormEvent, useCallback } from "react";

const logger = createScopedLogger("StyleTransferForm");

export function StyleTransferForm() {
  const t = useTranslations("left_panel.forms.style_transfer");

  const { setValue, isCreating, handleProcessTask } = useStyleTransferForm();

  const { oriImageFile, refImageFile } = useAtomValue(styleTransferFormStore);

  const canSubmit = !!oriImageFile && !!refImageFile;

  const handleImageUploaded = useCallback(
    (imageUrl: string, type: "ori" | "ref") => {
      setValue(`${type}ImageFile`, imageUrl);
    },
    [setValue]
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      logger.debug("handleSubmit styleTransfer task");
      handleProcessTask();
    },
    [handleProcessTask]
  );

  return (
    <form className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-y-6">
        <ImageUploader
          label={t("ori_image_label")}
          placeholder={t("ori_image_placeholder")}
          showImageUrl={oriImageFile}
          handleUploaded={(imageUrl) => handleImageUploaded(imageUrl, "ori")}
        />

        <ImageUploader
          label={t("ref_image_label")}
          placeholder={t("ref_image_placeholder")}
          showImageUrl={refImageFile}
          handleUploaded={(imageUrl) => handleImageUploaded(imageUrl, "ref")}
        />
      </div>

      <Button
        variant="default"
        type="submit"
        className="mt-6 flex flex-row gap-x-2"
        onClick={handleSubmit}
        disabled={!canSubmit || isCreating}
      >
        <LoaderRenderer
          status={isCreating ? "creating" : "idle"}
          statuses={{
            idle: { icon: null, text: t("generate_button.idle") },
            creating: {
              icon: <Loader2 className="h-4 w-4 animate-spin" />,
              text: t("generate_button.creating"),
            },
          }}
        />
      </Button>
    </form>
  );
}
