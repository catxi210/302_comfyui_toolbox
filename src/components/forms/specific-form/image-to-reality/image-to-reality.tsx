"use client";

import { ImageUploader } from "@/components/business/image-uploader/image-uploader";
import { imageToRealityFormStore } from "@/stores/slices/image_to_reality_form.store";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import FormGenerator from "@/components/common/form-generator";
import { GLOBAL } from "@/constants";
import { useImageToRealityForm } from "@/hooks/form/use-image-to-reality.form";
import { Button } from "@/components/ui/button";
import { LoaderRenderer } from "@/components/common/loader-renderer";
import { Loader2 } from "lucide-react";
import { FormEvent, useCallback } from "react";
import { createScopedLogger } from "@/utils";

const logger = createScopedLogger("ImageToRealityForm");

export function ImageToRealityForm() {
  const t = useTranslations("left_panel.forms.image_to_reality");

  const { watch, register, setValue, errors, isCreating, handleProcessTask } =
    useImageToRealityForm();

  const { imageFile } = useAtomValue(imageToRealityFormStore);

  const canSubmit = !!imageFile;

  const handleImageUploaded = useCallback(
    (imageUrl: string) => {
      setValue("imageFile", imageUrl);
    },
    [setValue]
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      logger.debug("handleSubmit imageToReality task");
      handleProcessTask();
    },
    [handleProcessTask]
  );

  return (
    <form className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-y-6">
        <ImageUploader
          label={t("image_label")}
          placeholder={t("image_placeholder")}
          showImageUrl={imageFile}
          handleUploaded={handleImageUploaded}
        />

        <FormGenerator
          id="target-type"
          name="targetType"
          inputType="select"
          label={t("selector.label")}
          defaultValue={GLOBAL.IMAGE_TO_REALITY_TARGET_TYPE.SUPPORTED[0].label}
          options={GLOBAL.IMAGE_TO_REALITY_TARGET_TYPE.SUPPORTED.map(
            ({ label, value }) => ({
              id: value,
              value: value,
              label: t(`selector.options.${label}`),
            })
          )}
          watch={watch}
          register={register}
          setValue={setValue}
          errors={errors}
        />
      </div>

      <Button
        variant="default"
        type="submit"
        className="flex flex-row gap-x-2"
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
