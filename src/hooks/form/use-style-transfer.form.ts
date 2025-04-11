import { styleTransferFormSchema } from "@/components/forms/specific-form/style-transfer/schema";
import { formHookFactory } from "./form-hook-factory";
import { StyleTransferFormType } from "@/components/forms/specific-form/style-transfer/schema";
import {
  defaultState,
  styleTransferFormStore,
} from "@/stores/slices/style_transfer_form.store";
import { useStyleTransferApi } from "../api/use-style-transfer.api";

const FORM_HOOK_NAME = "useStyleTransferForm";
const TRANSLATION_KEY = "left_panel.hooks.clothes_changer";

export function useStyleTransferForm() {
  const useStyleTransferFormHook = formHookFactory<StyleTransferFormType>({
    name: FORM_HOOK_NAME,
    schema: styleTransferFormSchema,
    store: styleTransferFormStore,
    defaultState,
    translationKey: TRANSLATION_KEY,
  })();

  const { getValues, validateForm } = useStyleTransferFormHook;

  const { isCreating, handleProcessTask } = useStyleTransferApi({
    getValues: getValues,
    validateForm: validateForm,
  });

  return { ...useStyleTransferFormHook, isCreating, handleProcessTask };
}
