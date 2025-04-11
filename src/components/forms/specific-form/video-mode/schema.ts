import { z } from "zod";

export const videoModeFormSchema = z
  .object({
    imageFile: z.string(),
    cameraLanguage: z.string(),
    expression: z.string(),
    emotion: z.string(),
    industry: z.string(),
    actions: z.array(z.string()),
    restrictiveWords: z.array(z.string()),
    optimization: z.boolean(),
    resolution: z.enum(["std", "hq"]),
    extraRequest: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Validate imageFile
    if (!data.imageFile || !data.imageFile.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Image file is required",
        path: ["imageFile"],
      });
    }

    // Validate cameraLanguage
    if (!data.cameraLanguage || !data.cameraLanguage.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Camera language is required",
        path: ["cameraLanguage"],
      });
    }

    // Validate expression
    if (!data.expression || !data.expression.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Expression is required",
        path: ["expression"],
      });
    }

    // Validate emotion
    if (!data.emotion || !data.emotion.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Emotion is required",
        path: ["emotion"],
      });
    }

    // Validate industry
    if (!data.industry || !data.industry.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Industry is required",
        path: ["industry"],
      });
    }

    // Validate actions
    if (!data.actions || data.actions.length === 0 || data.actions.length > 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select actions as required",
        path: ["actions"],
      });
    }

    // Validate restrictiveWords
    if (
      !data.restrictiveWords ||
      data.restrictiveWords.length === 0 ||
      data.restrictiveWords.length > 2
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select restrictiveWords as required",
        path: ["restrictiveWords"],
      });
    }

    // Validate resolution
    if (!data.resolution || !data.resolution.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Resolution is required",
        path: ["resolution"],
      });
    }
  });

export type VideoModeFormType = z.infer<typeof videoModeFormSchema>;
