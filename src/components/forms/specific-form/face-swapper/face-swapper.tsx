"use client";

import { ImageUploader } from "@/components/business/image-uploader/image-uploader";
import FormGenerator from "@/components/common/form-generator";
import { LoaderRenderer } from "@/components/common/loader-renderer";
import { Button } from "@/components/ui/button";
import { useFaceSwapperForm } from "@/hooks/form/use-face-swapper.form";
import { faceSwapperFormStore } from "@/stores/slices/face_swapper_form.store";
import { createScopedLogger } from "@/utils";
import { useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormEvent, useCallback } from "react";
import { TbUserUp } from "react-icons/tb";
import { MdOutlineFaceRetouchingNatural } from "react-icons/md";

const logger = createScopedLogger("FaceSwapperForm");

export function FaceSwapperForm() {
  const t = useTranslations("left_panel.forms.face_swapper");

  const { watch, register, setValue, errors, isCreating, handleProcessTask } =
    useFaceSwapperForm();

  const { faceImageFile, targetImageFile } = useAtomValue(faceSwapperFormStore);

  const canSubmit = !!faceImageFile && !!targetImageFile;

  const handleImageUploaded = useCallback(
    (imageUrl: string, type: "face" | "target") => {
      setValue(`${type}ImageFile`, imageUrl);
    },
    [setValue]
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      logger.debug("handleSubmit faceSwapper task");
      handleProcessTask();
    },
    [handleProcessTask]
  );

  return (
    <form className="flex flex-col gap-y-6">
      <ImageUploader
        label={t("face_image_label")}
        placeholder={t("face_image_placeholder")}
        showImageUrl={faceImageFile}
        handleUploaded={(imageUrl) => handleImageUploaded(imageUrl, "face")}
      >
        <TbUserUp className="size-8" />
      </ImageUploader>

      <ImageUploader
        label={t("target_image_label")}
        placeholder={t("target_image_placeholder")}
        showImageUrl={targetImageFile}
        handleUploaded={(imageUrl) => handleImageUploaded(imageUrl, "target")}
      >
        <MdOutlineFaceRetouchingNatural className="size-8" />
      </ImageUploader>

      <FormGenerator
        id="film-filter"
        name="filmFilter"
        inputType="checkbox"
        label={t("checkbox.label")}
        watch={watch}
        register={register}
        setValue={setValue}
        errors={errors}
      />

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
