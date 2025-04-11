import {
  clothesChangerFormSchema,
  ClothesChangerFormType,
} from "@/components/forms/specific-form/clothes-changer/schema";
import {
  clothesChangerFormStore,
  defaultState,
} from "@/stores/slices/clothes_changer_form.store";
import { formHookFactory } from "./form-hook-factory";
import { useClothesChangerApi } from "../api/use-clothes-changer.api";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

const FORM_HOOK_NAME = "useClothesChangerForm";
const TRANSLATION_KEY = "left_panel.hooks.clothes_changer";

export function useClothesChangerForm() {
  const t = useTranslations("left_panel.hooks.clothes_changer");

  const useClothesChangerFormHook = formHookFactory<ClothesChangerFormType>({
    name: FORM_HOOK_NAME,
    schema: clothesChangerFormSchema,
    store: clothesChangerFormStore,
    defaultState,
    translationKey: TRANSLATION_KEY,
  })();

  const { getValues, validateForm } = useClothesChangerFormHook;

  const { isCreating, handleProcessTask } = useClothesChangerApi({
    getValues: getValues,
    validateForm: validateForm,
  });

  const clothesLabels = useMemo(
    () => [
      {
        label: t("labels.face"),
        value: "0",
      },
      {
        label: t("labels.hair"),
        value: "1",
      },
      {
        label: t("labels.hat"),
        value: "2",
      },
      {
        label: t("labels.sunglass"),
        value: "3",
      },
      {
        label: t("labels.left_arm"),
        value: "4",
      },
      {
        label: t("labels.right_arm"),
        value: "5",
      },
      {
        label: t("labels.left_leg"),
        value: "6",
      },
      {
        label: t("labels.right_leg"),
        value: "7",
      },
      {
        label: t("labels.left_shoe"),
        value: "8",
      },
      {
        label: t("labels.right_shoe"),
        value: "9",
      },
      {
        label: t("labels.upper_clothes"),
        value: "10",
      },
      {
        label: t("labels.skirt"),
        value: "11",
      },
      {
        label: t("labels.pants"),
        value: "12",
      },
      {
        label: t("labels.dress"),
        value: "13",
      },
      {
        label: t("labels.belt"),
        value: "14",
      },
      {
        label: t("labels.bag"),
        value: "15",
      },
      {
        label: t("labels.scarf"),
        value: "16",
      },
    ],
    [t]
  );

  return {
    ...useClothesChangerFormHook,
    isCreating,
    handleProcessTask,
    clothesLabels,
  };
}
