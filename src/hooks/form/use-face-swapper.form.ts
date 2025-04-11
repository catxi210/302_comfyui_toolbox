import { formHookFactory } from "./form-hook-factory";
import {
  defaultState,
  faceSwapperFormStore,
} from "@/stores/slices/face_swapper_form.store";
import {
  faceSwapperFormSchema,
  FaceSwapperFormType,
} from "@/components/forms/specific-form/face-swapper/schema";
import { useFaceSwapperApi } from "../api/use-face-swapper.api";

const FORM_HOOK_NAME = "useFaceSwapperForm";
const TRANSLATION_KEY = "left_panel.hooks.face_swapper";

export function useFaceSwapperForm() {
  const useFaceSwapperFormHook = formHookFactory<FaceSwapperFormType>({
    name: FORM_HOOK_NAME,
    schema: faceSwapperFormSchema,
    store: faceSwapperFormStore,
    defaultState,
    translationKey: TRANSLATION_KEY,
  })();

  const { getValues, validateForm } = useFaceSwapperFormHook;

  const { isCreating, handleProcessTask } = useFaceSwapperApi({
    getValues: getValues,
    validateForm: validateForm,
  });

  return { ...useFaceSwapperFormHook, isCreating, handleProcessTask };
}
