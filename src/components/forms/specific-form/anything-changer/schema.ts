import { LinesSchema } from "@/components/business/paint/type";
import { z } from "zod";

export const anythingChangerFormSchema = z
  .object({
    mode: z.enum(["description", "paint"]),
    sourceImageFile: z.string(),
    targetImageFile: z.string(),
    sourceDescription: z.string(),
    targetDescription: z.string(),
    smallObject: z.boolean(),
    sourceMaskLines: z.array(LinesSchema),
    targetMaskLines: z.array(LinesSchema),
  })
  .superRefine((data, ctx) => {
    // Validate sourceImageFile
    if (!data.sourceImageFile || !data.sourceImageFile.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Source image file is required",
        path: ["sourceImageFile"],
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

    // Validate sourceDescription
    if (
      data.mode === "description" &&
      (!data.sourceDescription || !data.sourceDescription.trim())
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Source description is required",
        path: ["sourceDescription"],
      });
    }

    // Validate targetDescription
    if (
      data.mode === "description" &&
      (!data.targetDescription || !data.targetDescription.trim())
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Target description is required",
        path: ["targetDescription"],
      });
    }

    if (data.mode === "paint" && data.sourceMaskLines.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Source mask is required",
        path: ["sourceMaskLines"],
      });
    }

    if (data.mode === "paint" && data.targetMaskLines.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cloth mask is required",
        path: ["targetMaskLines"],
      });
    }
  });

export type AnythingChangerFormType = z.infer<typeof anythingChangerFormSchema>;
