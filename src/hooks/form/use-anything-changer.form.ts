import { formHookFactory } from "./form-hook-factory";
import {
  AnythingChangerFormType,
  anythingChangerFormSchema,
} from "@/components/forms/specific-form/anything-changer/schema";
import {
  anythingChangerFormStore,
  defaultState,
} from "@/stores/slices/anything_changer_form.store";
import { useAnythingChangerApi } from "../api/use-anything-changer.api";

const FORM_HOOK_NAME = "useAnythingChangerForm";
const TRANSLATION_KEY = "left_panel.hooks.anything_changer";

export function useAnythingChangerForm() {
  const useAnythingChangerFormHook = formHookFactory<AnythingChangerFormType>({
    name: FORM_HOOK_NAME,
    schema: anythingChangerFormSchema,
    store: anythingChangerFormStore,
    defaultState,
    translationKey: TRANSLATION_KEY,
  })();

  const { getValues, validateForm } = useAnythingChangerFormHook;

  const { isCreating, handleProcessTask } = useAnythingChangerApi({
    getValues: getValues,
    validateForm: validateForm,
  });

  return { ...useAnythingChangerFormHook, isCreating, handleProcessTask };
}
