import { z } from "zod";

export const faceSwapperFormSchema = z
  .object({
    faceImageFile: z.string(),
    targetImageFile: z.string(),
    filmFilter: z.boolean(),
  })
  .superRefine((data, ctx) => {
    // Validate faceImageFile
    if (!data.faceImageFile || !data.faceImageFile.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Face image file is required",
        path: ["faceImageFile"],
      });
    }

    // Validate targetImageFile
    if (!data.targetImageFile || !data.targetImageFile.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Target image file is required",
        path: ["targetImageFile"],
      });
    }
  });

export type FaceSwapperFormType = z.infer<typeof faceSwapperFormSchema>;
