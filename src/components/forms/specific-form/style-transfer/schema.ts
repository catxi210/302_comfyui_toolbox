import { z } from "zod";

export const styleTransferFormSchema = z
  .object({
    oriImageFile: z.string(),
    refImageFile: z.string(),
  })
  .superRefine((data, ctx) => {
    // Validate oriImageFile
    if (!data.oriImageFile || !data.oriImageFile.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Original image file is required",
        path: ["oriImageFile"],
      });
    }
    // Validate refImageFile
    if (!data.refImageFile || !data.refImageFile.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Reference image file is required",
        path: ["refImageFile"],
      });
    }
  });

export type StyleTransferFormType = z.infer<typeof styleTransferFormSchema>;
