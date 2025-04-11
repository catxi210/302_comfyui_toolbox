import {
  imageToRealityFormSchema,
  ImageToRealityFormType,
} from "@/components/forms/specific-form/image-to-reality/schema";
import {
  defaultState,
  imageToRealityFormStore,
} from "@/stores/slices/image_to_reality_form.store";
import { formHookFactory } from "./form-hook-factory";
import { useImageToRealityApi } from "../api/use-image-to-reality.api";

const FORM_HOOK_NAME = "useImageToRealityForm";
const TRANSLATION_KEY = "left_panel.hooks.image_to_reality";

export function useImageToRealityForm() {
  const useImageToRealityFormHook = formHookFactory<ImageToRealityFormType>({
    name: FORM_HOOK_NAME,
    schema: imageToRealityFormSchema,
    store: imageToRealityFormStore,
    defaultState,
    translationKey: TRANSLATION_KEY,
  })();

  const { getValues, validateForm } = useImageToRealityFormHook;

  const { isCreating, handleProcessTask } = useImageToRealityApi({
    getValues: getValues,
    validateForm: validateForm,
  });

  return { ...useImageToRealityFormHook, isCreating, handleProcessTask };
}
