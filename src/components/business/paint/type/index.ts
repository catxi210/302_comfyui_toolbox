import { z } from "zod";

export type BrushMode = "brush" | "eraser";

export const LinesSchema = z.object({
  points: z.array(
    z.object({
      x: z.number(),
      y: z.number(),
    })
  ),
  erase: z.boolean(),
  brushSize: z.number(),
});
export type DrawLine = z.infer<typeof LinesSchema>;
