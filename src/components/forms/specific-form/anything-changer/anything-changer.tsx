"use client";

import { ImageUploader } from "@/components/business/image-uploader/image-uploader";
import FormGenerator from "@/components/common/form-generator";
import { LoaderRenderer } from "@/components/common/loader-renderer";
import { Button } from "@/components/ui/button";
import { useAnythingChangerForm } from "@/hooks/form/use-anything-changer.form";
import { anythingChangerFormStore } from "@/stores/slices/anything_changer_form.store";
import { createScopedLogger } from "@/utils";
import { useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormEvent, useCallback, useState } from "react";
import { ModeSelector } from "@/components/business/mode-selector/mode-selector";
import { BrushMode, DrawLine } from "@/components/business/paint/type";
import { PaintModeToggleGroup } from "@/components/business/paint/paint-mode-toggle-group";
import { BrushSizeSlider } from "@/components/business/paint/brush-size-slider";

const logger = createScopedLogger("AnythingChangerForm");

export function AnythingChangerForm() {
  const t = useTranslations("left_panel.forms.anything_changer");

  const { watch, setValue, register, isCreating, errors, handleProcessTask } =
    useAnythingChangerForm();

  const {
    mode,
    sourceImageFile,
    targetImageFile,
    sourceDescription,
    targetDescription,
    sourceMaskLines,
    targetMaskLines,
  } = useAtomValue(anythingChangerFormStore);

  const [brushMode, setBrushMode] = useState<BrushMode>("brush");
  const [brushSize, setBrushSize] = useState<number[]>([20]);

  const isPaintMode = mode === "paint";
  const isEraser = brushMode === "eraser";
  const canSubmit = () => {
    if (isPaintMode) {
      return (
        !!sourceImageFile &&
        !!targetImageFile &&
        sourceMaskLines.length !== 0 &&
        targetMaskLines.length !== 0
      );
    }
    return (
      !!sourceImageFile &&
      !!targetImageFile &&
      !!sourceDescription &&
      !!targetDescription
    );
  };

  const handleReset = useCallback(
    (type: "source" | "target") => {
      setValue(`${type}MaskLines`, []);
    },
    [setValue]
  );

  const handleLineDraw = useCallback(
    (lines: DrawLine[], type: "source" | "target") => {
      setValue(`${type}MaskLines`, lines);
    },
    [setValue]
  );

  const handleModeChange = useCallback((mode: BrushMode) => {
    setBrushMode(mode);
  }, []);

  const handBrushSizeChange = useCallback((brushSize: number[]) => {
    setBrushSize(brushSize);
    logger.debug(`Current brushSize: ${brushSize}`);
  }, []);

  const handleImageUploaded = useCallback(
    (imageUrl: string, type: "source" | "target") => {
      setValue(`${type}ImageFile`, imageUrl);
      // setBrushSize([20]);
      // setBrushMode("brush");
      setValue(`${type}MaskLines`, []);
    },
    [setValue]
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      logger.debug("handleSubmit anythingChanger task");
      handleProcessTask();
    },
    [handleProcessTask]
  );

  return (
    <form className="flex flex-col gap-y-6">
      <ModeSelector
        label={t("model_selector_label")}
        value={mode}
        leftItemName={t("model_selector_left_item_name")}
        leftItemValue="description"
        rightItemName={t("model_selector_right_item_name")}
        rightItemValue="paint"
        onValueChange={(value) => setValue("mode", value)}
      ></ModeSelector>

      <ImageUploader
        label={t("source_image_label")}
        placeholder={t("source_image_placeholder")}
        showImageUrl={sourceImageFile}
        handleUploaded={(imageUrl) => handleImageUploaded(imageUrl, "source")}
        canPaint={isPaintMode}
        isEraser={isEraser}
        brushSize={brushSize[0]}
        lines={sourceMaskLines}
        setLines={(newLine) => handleLineDraw(newLine, "source")}
        onModeChange={handleModeChange}
        onBrushSizeChange={handBrushSizeChange}
        onReset={() => handleReset("source")}
      />

      <div className={isPaintMode ? "hidden" : ""}>
        <FormGenerator
          id="source-description"
          name="sourceDescription"
          className={isPaintMode ? "hidden" : ""}
          inputType="textarea"
          placeholder={t("source_placeholder")}
          textareaConfig={{
            wrapperClassName: "h-[100px]",
          }}
          watch={watch}
          register={register}
          setValue={setValue}
          errors={errors}
        />
      </div>

      <ImageUploader
        label={t("target_image_label")}
        placeholder={t("target_image_placeholder")}
        showImageUrl={targetImageFile}
        handleUploaded={(imageUrl) => handleImageUploaded(imageUrl, "target")}
        canPaint={isPaintMode}
        isEraser={isEraser}
        brushSize={brushSize[0]}
        lines={targetMaskLines}
        setLines={(newLine) => handleLineDraw(newLine, "target")}
        onModeChange={handleModeChange}
        onBrushSizeChange={handBrushSizeChange}
        onReset={() => handleReset("target")}
      />

      <div className={isPaintMode ? "hidden" : ""}>
        <FormGenerator
          id="target-description"
          name="targetDescription"
          inputType="textarea"
          placeholder={t("target_placeholder")}
          textareaConfig={{
            wrapperClassName: "h-[100px]",
          }}
          watch={watch}
          register={register}
          setValue={setValue}
          errors={errors}
        />
      </div>

      <FormGenerator
        id="smallO-oject"
        name="smallObject"
        inputType="checkbox"
        label={t("checkbox.label")}
        watch={watch}
        register={register}
        setValue={setValue}
        errors={errors}
      />

      <PaintModeToggleGroup
        className={isPaintMode ? "" : "hidden"}
        value={brushMode}
        onModeChange={handleModeChange}
      />

      <BrushSizeSlider
        className={isPaintMode ? "" : "hidden"}
        value={brushSize}
        onBrushSizeChange={handBrushSizeChange}
        min={1}
        max={50}
        step={1}
      />

      <Button
        variant="default"
        type="submit"
        className="flex flex-row gap-x-2"
        onClick={handleSubmit}
        disabled={!canSubmit() || isCreating}
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
