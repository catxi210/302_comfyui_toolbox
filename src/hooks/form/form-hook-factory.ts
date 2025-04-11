import { zodResolver } from "@hookform/resolvers/zod";
import { PrimitiveAtom, useAtom } from "jotai";
import { useCallback } from "react";
import { DefaultValues, Path, useForm } from "react-hook-form";
import { z } from "zod";
import { createScopedLogger } from "@/utils";
import { useTranslations } from "next-intl";

interface CreateFormHookOptions<T> {
  name: string;
  schema: z.ZodSchema<T>;
  store: PrimitiveAtom<T>;
  defaultState: DefaultValues<T>;
  translationKey: string;
}

export function formHookFactory<T extends Record<string, any>>({
  name,
  schema,
  store,
  defaultState,
  translationKey,
}: CreateFormHookOptions<T>) {
  const logger = createScopedLogger(name);

  return function useFormHook() {
    const t = useTranslations(translationKey);
    const [storedForm, setStoredForm] = useAtom(store);

    const {
      watch,
      getValues,
      register,
      setValue: setValueForm,
      setError,
      trigger,
      formState: { errors },
    } = useForm<T>({
      values: storedForm,
      resolver: zodResolver(schema, {
        errorMap: (error, ctx) => {
          logger.debug("Zod error:", error, ctx);
          return { message: error.message || "Validation error" };
        },
      }),
      mode: "onSubmit",
      criteriaMode: "all",
      defaultValues: defaultState,
    });

    const setValue = useCallback(
      (name: Path<T>, value: any) => {
        // logger.debug(name, value);
        setValueForm(name, value);
        setStoredForm((prev: T) => ({
          ...prev,
          [name]: value,
        }));
      },
      [setValueForm, setStoredForm]
    );

    const validateForm = useCallback(
      (formData: T) => {
        const validationRes = schema.safeParse(formData);
        if (!validationRes.success) {
          const formattedErrors = validationRes.error.issues.map((issue) => ({
            path: issue.path,
            message: issue.message,
          }));

          logger.debug(
            "Formatted validation errors:",
            JSON.stringify(formattedErrors, null, 2)
          );

          formattedErrors.forEach((error) => {
            const field = error.path[error.path.length - 1];
            if (typeof field === "string") {
              setError(field as Path<T>, {
                type: "custom",
                message: t(`errors.${error.path[0]}`),
              });
            }
          });

          if (formattedErrors.length > 0) {
            const firstError = formattedErrors[0];
            const firstErrorField = firstError.path[firstError.path.length - 1];
            if (typeof firstErrorField === "string") {
              const errorElement = document.querySelector(
                `[name="${firstErrorField}"]`
              );
              logger.debug("First error field:", firstErrorField);
              if (errorElement instanceof HTMLElement) {
                errorElement.focus();
              }
            }
          }

          return;
        }
      },
      [setError, t]
    );

    return {
      watch,
      getValues,
      register,
      setValue,
      setError,
      trigger,
      errors,
      validateForm,
    };
  };
}
