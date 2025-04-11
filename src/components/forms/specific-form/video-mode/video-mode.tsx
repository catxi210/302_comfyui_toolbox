import { ImageUploader } from "@/components/business/image-uploader/image-uploader";
import {
  MultiSelector,
  OptionType,
} from "@/components/business/multi-selector/multi-selector";
import FormGenerator from "@/components/common/form-generator";
import { LoaderRenderer } from "@/components/common/loader-renderer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useVideoModeForm } from "@/hooks/form/use-video.form";
import { videoModeFormStore } from "@/stores/slices/video_mode_form.store";
import { createScopedLogger } from "@/utils";
import { useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormEvent, useCallback, useMemo, useEffect } from "react";
import { TbUserUp } from "react-icons/tb";
import { MultiValue } from "react-select";

const logger = createScopedLogger("VideoModeForm");

export function VideoModeForm() {
  const t = useTranslations("left_panel.forms.video_mode");

  const {
    watch,
    register,
    errors,
    getValues,
    setValue,
    isCreating,
    handleProcessTask,
    cameraLanguages,
    expressions,
    emotions,
    industries,
    restrictiveWords: restrictivePrompts,
  } = useVideoModeForm();

  const {
    imageFile,
    cameraLanguage,
    expression,
    emotion,
    industry,
    actions,
    restrictiveWords,
    resolution,
  } = useAtomValue(videoModeFormStore);

  const selectedIndustry = watch("industry");
  const canSubmit =
    !!imageFile &&
    !!cameraLanguage &&
    !!expression &&
    !!emotion &&
    !!industry &&
    !!actions.length &&
    !!restrictiveWords.length &&
    !!resolution;

  const currentIndustryActions = useMemo(() => {
    const industry = industries.find((ind) => ind.value === selectedIndustry);
    return industry?.actions || [];
  }, [industries, selectedIndustry]);

  const handleActionsChanged = useCallback(
    (selectedOptions: MultiValue<OptionType>) => {
      const actionsValue = selectedOptions.map((option) => option.value);
      setValue("actions", actionsValue);
    },
    [setValue]
  );

  const handleRestrictiveWordsChanged = useCallback(
    (selectedOptions: MultiValue<OptionType>) => {
      const actionsValue = selectedOptions.map((option) => option.value);
      setValue("restrictiveWords", actionsValue);
    },
    [setValue]
  );

  const getFormattedLabels = useCallback(
    (fieldValue: string[], field: "actions" | "restrictiveWords") => {
      if (field === "actions") {
        const selectedIndustry = watch("industry");
        const industry = industries.find(
          (ind) => ind.value === selectedIndustry
        );

        return fieldValue.map((value) => {
          const action = industry?.actions?.find((act) => act.value === value);
          return {
            value,
            label: action?.label || value,
          };
        });
      }
      if (field === "restrictiveWords") {
        return fieldValue.map((value) => {
          const restrictiveWords = restrictivePrompts.find(
            (act) => act.value === value
          );
          return {
            value,
            label: restrictiveWords?.label || value,
          };
        });
      }

      return [];
    },
    [watch, industries, restrictivePrompts]
  );

  const handleRadioChanged = useCallback(
    (value: string) => {
      setValue("resolution", value);
    },
    [setValue]
  );

  const handleImageUploaded = useCallback(
    (imageUrl: string) => {
      setValue("imageFile", imageUrl);
    },
    [setValue]
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      logger.debug("handleSubmit videoMode task");
      handleProcessTask();
    },
    [handleProcessTask]
  );

  useEffect(() => {
    setValue("actions", []);
  }, [selectedIndustry, setValue]);

  return (
    <form className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-y-6">
        <ImageUploader
          label={t("image_label")}
          placeholder={t("image_placeholder")}
          showImageUrl={imageFile}
          handleUploaded={handleImageUploaded}
        >
          <TbUserUp className="size-8" />
        </ImageUploader>

        <FormGenerator
          id="camera-language"
          name="cameraLanguage"
          inputType="select"
          label={t("selector.label.camera_language")}
          placeholder={t("selector.placeholder.camera_language")}
          options={cameraLanguages.map(({ label, value }) => ({
            id: value,
            label: label,
            value: value,
          }))}
          watch={watch}
          register={register}
          setValue={setValue}
          errors={errors}
        />

        <FormGenerator
          id="expression"
          name="expression"
          inputType="select"
          label={t("selector.label.expression")}
          placeholder={t("selector.placeholder.expression")}
          options={expressions.map(({ label, value }) => ({
            id: value,
            label: label,
            value: value,
          }))}
          watch={watch}
          register={register}
          setValue={setValue}
          errors={errors}
        />

        <FormGenerator
          id="emotion"
          name="emotion"
          inputType="select"
          label={t("selector.label.emotion")}
          placeholder={t("selector.placeholder.emotion")}
          options={emotions.map(({ label, value }) => ({
            id: value,
            label: label,
            value: value,
          }))}
          watch={watch}
          register={register}
          setValue={setValue}
          errors={errors}
        />

        <FormGenerator
          id="industry"
          name="industry"
          inputType="select"
          label={t("selector.label.industry")}
          placeholder={t("selector.placeholder.industry")}
          options={industries.map(({ label, value }) => ({
            id: value,
            label: label,
            value: value,
          }))}
          watch={watch}
          register={register}
          setValue={setValue}
          errors={errors}
        />

        <MultiSelector
          label={t("muti_selector.label.action")}
          options={currentIndustryActions.map(({ label, value }) => ({
            id: value,
            label: label,
            value: value,
          }))}
          placeholder={t("muti_selector.placeholder.action")}
          value={getFormattedLabels(getValues("actions"), "actions")}
          onChange={handleActionsChanged}
          maxItems={2}
        />

        <MultiSelector
          label={t("muti_selector.label.restrictive_words")}
          options={restrictivePrompts.map(({ label, value }) => ({
            id: value,
            label: label,
            value: value,
          }))}
          placeholder={t("muti_selector.placeholder.restrictive_words")}
          value={getFormattedLabels(
            getValues("restrictiveWords"),
            "restrictiveWords"
          )}
          onChange={handleRestrictiveWordsChanged}
          maxItems={2}
        />

        <FormGenerator
          id="optimization"
          name="optimization"
          inputType="switch"
          label={t("selector.label.optimization")}
          watch={watch}
          register={register}
          setValue={setValue}
          errors={errors}
        />

        <div className="flex w-full flex-row justify-between">
          <Label>{t("radio_group.label.resolution")}</Label>
          <RadioGroup
            className="flex flex-row gap-y-2"
            onValueChange={handleRadioChanged}
            value={watch("resolution")}
          >
            <div className="flex flex-row">
              <RadioGroupItem value="std" />
              <Label className="pl-2 leading-tight">
                {t("radio_group.item.std")}
              </Label>
            </div>
            <div className="flex flex-row">
              <RadioGroupItem value="hq" />
              <Label className="pl-2 leading-tight">
                {t("radio_group.item.hq")}
              </Label>
            </div>
          </RadioGroup>
        </div>

        <FormGenerator
          id="extra-request"
          name="extraRequest"
          inputType="textarea"
          label={t("textarea.label.extra_request")}
          placeholder={t("textarea.placeholder.extra_request")}
          textareaConfig={{
            wrapperClassName: "h-[100px]",
          }}
          watch={watch}
          register={register}
          setValue={setValue}
          errors={errors}
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
