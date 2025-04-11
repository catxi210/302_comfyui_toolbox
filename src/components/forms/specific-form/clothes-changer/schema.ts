import { LinesSchema } from "@/components/business/paint/type";
import { z } from "zod";

export const clothesChangerFormSchema = z
  .object({
    mode: z.enum(["label", "paint"]),
    modelImageFile: z.string(),
    clothesImageFile: z.string(),
    modelImgSegLabels: z.array(z.string()),
    clothesImgSegLabels: z.array(z.string()),
    modelMaskLines: z.array(LinesSchema),
    clothesMaskLines: z.array(LinesSchema),
  })
  .superRefine((data, ctx) => {
    // Validate modelImageFile
    if (!data.modelImageFile || !data.modelImageFile.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Model image file is required",
        path: ["modelImageFile"],
      });
    }

    // Validate clothImageFile
    if (!data.clothesImageFile || !data.clothesImageFile.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cloth image file is required",
        path: ["clothImageFile"],
      });
    }

    // Validate modelImgSegLabels
    if (
      data.mode === "label" &&
      (!data.modelImgSegLabels || data.modelImgSegLabels.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Model image segmentation labels are required",
        path: ["modelImgSegLabels"],
      });
    }

    // Validate clothesImgSegLabels
    if (
      data.mode === "label" &&
      (!data.clothesImgSegLabels || data.clothesImgSegLabels.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cloth image segmentation labels are required",
        path: ["clothesImgSegLabels"],
      });
    }

    if (data.mode === "paint" && data.modelMaskLines.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Model mask is required",
        path: ["modelMaskLines"],
      });
    }

    if (data.mode === "paint" && data.clothesMaskLines.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cloth mask is required",
        path: ["clothesMaskLines"],
      });
    }
  });

export type ClothesChangerFormType = z.infer<typeof clothesChangerFormSchema>;
