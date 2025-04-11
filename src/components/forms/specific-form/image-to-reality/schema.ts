import { z } from "zod";

export const imageToRealityFormSchema = z
  .object({
    imageFile: z.string(),
    targetType: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.imageFile || !data.imageFile.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Image file is required",
        path: ["imageFile"],
      });
    }

    if (!data.targetType || !data.targetType.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Target type is required",
        path: ["targetType"],
      });
    }
  });

export type ImageToRealityFormType = z.infer<typeof imageToRealityFormSchema>;
