"use client";

import { ImageUploader } from "@/components/business/image-uploader/image-uploader";
import {
  MultiSelector,
  OptionType,
} from "@/components/business/multi-selector/multi-selector";
import { LoaderRenderer } from "@/components/common/loader-renderer";
import { Button } from "@/components/ui/button";
import { useClothesChangerForm } from "@/hooks/form/use-clothes-changer.form";
import { clothesChangerFormStore } from "@/stores/slices/clothes_changer_form.store";
import { createScopedLogger } from "@/utils";
import { useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormEvent, useCallback, useState } from "react";
import { MultiValue } from "react-select";
import { TbUserUp } from "react-icons/tb";
import { ModeSelector } from "@/components/business/mode-selector/mode-selector";
import { PaintModeToggleGroup } from "@/components/business/paint/paint-mode-toggle-group";
import { BrushMode, DrawLine } from "@/components/business/paint/type";
import { BrushSizeSlider } from "@/components/business/paint/brush-size-slider";

const logger = createScopedLogger("ClothesChangerForm");

export function ClothesChangerForm() {
  const t = useTranslations("left_panel.forms.clothes_changer");

  const { setValue, getValues, isCreating, handleProcessTask, clothesLabels } =
    useClothesChangerForm();

  const {
    mode,
    modelImageFile,
    clothesImageFile,
    modelImgSegLabels,
    clothesImgSegLabels,
    modelMaskLines,
    clothesMaskLines,
  } = useAtomValue(clothesChangerFormStore);

  const [brushMode, setBrushMode] = useState<BrushMode>("brush");
  const [brushSize, setBrushSize] = useState<number[]>([20]);

  const isPaintMode = mode === "paint";
  const isEraser = brushMode === "eraser";
  const canSubmit = () => {
    if (isPaintMode) {
      return (
        !!modelImageFile &&
        !!clothesImageFile &&
        modelMaskLines.length !== 0 &&
        clothesMaskLines.length !== 0
      );
    }
    return (
      !!modelImageFile &&
      !!clothesImageFile &&
      modelImgSegLabels.length !== 0 &&
      clothesImgSegLabels.length !== 0
    );
  };

  const handleReset = useCallback(
    (type: "model" | "clothes") => {
      setValue(`${type}MaskLines`, []);
    },
    [setValue]
  );

  const handleLineDraw = useCallback(
    (lines: DrawLine[], type: "model" | "clothes") => {
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
    (imageUrl: string, type: "model" | "clothes") => {
      setValue(`${type}ImageFile`, imageUrl);
      setValue(`${type}MaskLines`, []);
    },
    [setValue]
  );

  const handleLabelsChanged = useCallback(
    (selectedOptions: MultiValue<OptionType>, type: "model" | "clothes") => {
      const formatOptions = selectedOptions.map((option) => option.value);

      setValue(`${type}ImgSegLabels`, formatOptions);

      logger.debug(`Current ${type}ImgSegLabels: ${formatOptions}`);
    },
    [setValue]
  );

  const getFormattedLabels = useCallback(
    (fieldValue: string[]) => {
      return fieldValue.map((value) => {
        const clothesLabel = clothesLabels.find(
          (clothesLabel) => clothesLabel.value === value
        );
        return {
          value,
          label: clothesLabel?.label || value,
        };
      });
    },
    [clothesLabels]
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      logger.debug("handleSubmit clothesChanger task");
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
        leftItemValue="label"
        rightItemName={t("model_selector_right_item_name")}
        rightItemValue="paint"
        onValueChange={(value) => setValue("mode", value)}
      ></ModeSelector>

      <ImageUploader
        label={t("model_image_label")}
        placeholder={t("model_image_placeholder")}
        showImageUrl={modelImageFile}
        handleUploaded={(imageUrl) => handleImageUploaded(imageUrl, "model")}
        canPaint={isPaintMode}
        isEraser={isEraser}
        brushSize={brushSize[0]}
        lines={modelMaskLines}
        setLines={(newLine) => handleLineDraw(newLine, "model")}
        onModeChange={handleModeChange}
        onBrushSizeChange={handBrushSizeChange}
        onReset={() => handleReset("model")}
      >
        <TbUserUp className="size-8" />
      </ImageUploader>

      <MultiSelector
        label={t("model_image_seg_labels_selector_label")}
        className={isPaintMode ? "hidden" : ""}
        options={clothesLabels.map(({ label, value }) => ({
          id: value,
          value: value,
          label: label,
        }))}
        placeholder={t("model_image_seg_labels_selector_placeholder")}
        value={getFormattedLabels(getValues("modelImgSegLabels"))}
        onChange={(selectedOptions) =>
          handleLabelsChanged(selectedOptions, "model")
        }
      />

      <ImageUploader
        label={t("clothes_image_label")}
        placeholder={t("clothes_image_placeholder")}
        showImageUrl={clothesImageFile}
        handleUploaded={(imageUrl) => handleImageUploaded(imageUrl, "clothes")}
        canPaint={isPaintMode}
        isEraser={isEraser}
        brushSize={brushSize[0]}
        lines={clothesMaskLines}
        setLines={(newLine) => handleLineDraw(newLine, "clothes")}
        onModeChange={handleModeChange}
        onBrushSizeChange={handBrushSizeChange}
        onReset={() => handleReset("clothes")}
      />

      <MultiSelector
        label={t("clothes_image_seg_labels_selector_label")}
        className={isPaintMode ? "hidden" : ""}
        options={clothesLabels.map(({ label, value }) => ({
          id: value,
          value: value,
          label: label,
        }))}
        placeholder={t("clothes_image_seg_labels_selector_placeholder")}
        value={getFormattedLabels(getValues("clothesImgSegLabels"))}
        onChange={(selectedOptions) =>
          handleLabelsChanged(selectedOptions, "clothes")
        }
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
