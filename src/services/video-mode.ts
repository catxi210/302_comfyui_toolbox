/* eslint-disable camelcase */
import { apiKy } from "@/api";
import { z } from "zod";
import dedent from "dedent";

export const createVideoModeTaskSchema = z.object({
  data: z.object({
    status: z.number(),
    task: z.object({
      id: z.string(),
    }),
  }),
  message: z.string(),
});
export type CreateVideoModeTaskResponse = z.infer<
  typeof createVideoModeTaskSchema
>;

const CREATE_VIDEO_MODE_TASK_API = "klingai/m2v_16_img2video_5s";
const CREATE_VIDEO_MODE_HQ_TASK_API = "klingai/m2v_16_img2video_hq_5s";

export async function createVideoModeTask(params: {
  imageFile: string;
  prompt: string;
  aspectRatio: string;
  resolution: "std" | "hq";
}): Promise<string> {
  const { imageFile, prompt, aspectRatio, resolution } = params;

  const apiUrl =
    resolution === "std"
      ? CREATE_VIDEO_MODE_TASK_API
      : CREATE_VIDEO_MODE_HQ_TASK_API;

  const negativePrompt = dedent`
    The background should be messy, the skin texture is unnatural, too smooth The eyes are distorted, the pupils are abnormal The tooth structure is wrong, the mouth shape is strange The hair texture is unrealistic, the hairline is abnormal Facial expressions are stiff and unnatural Mechanical body movements, twisted joints Unreasonable clothing wrinkles, wrong fabric texture Improper body proportions, wrong anatomical structure Inconsistent light and shadow effects, wrong shadow position Uneven skin tone, blurred facial features Lip sync does not match, speech is unnatural, and the interaction between the background and the characters is unreasonable Inconsistent relationships between characters in multiplayer scenes.
  `;

  const response = await apiKy
    .post(apiUrl, {
      json: {
        input_image: imageFile,
        prompt: prompt,
        negative_prompt: negativePrompt,
        cfg: 0.5,
        aspect_ratio: aspectRatio,
      },
    })
    .json<CreateVideoModeTaskResponse>();

  return response.data.task.id;
}
