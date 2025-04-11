import { apiKy } from "@/api";
import { z } from "zod";
import dedent from "dedent";

export const optimizedPromptSchema = z.object({
  choices: z.array(
    z.object({
      message: z.object({
        content: z.string(),
      }),
    })
  ),
});
export type OptimizedPromptResponse = z.infer<typeof optimizedPromptSchema>;

const OPTIMIZE_PROMPT_API = "v1/chat/completions";

const SYSTEM_PROMPT = dedent`You are an excellent short video producer who is good at making popular short videos on the Tiktok platform. Your task is to generate a storyboard description for a 5-second short video based on the provided content.

I will provide one or more of the following aspects:
-Camera language (such as camera angle, motion mode, etc.)
-Character expressions (such as smile, surprise, etc.)
-Emotional expression (such as happiness, depression, etc.)
-Character movements (such as walking, dancing, etc.)
-Constraint words (specific shooting requirements)

Please generate a complete storyboard description based on the provided content, including:
1. How to use the provided camera language
2. How to display character expressions and emotions
3. How to present character actions
4. How to meet the constraint word requirements

requirement:
-Accurately integrate the provided content elements
-Ensure complete presentation within 5 seconds
-Conform to the fast rhythm characteristics of Tiktok platform
-Describe the video in three parts: pre video, mid video, and post video

This is an example of output:
In the early stage of the video, the model stared affectionately at the camera, doing a hip lifting and swinging motion from a positive perspective. In the middle of the video, the model touched her hair with her hand up, maintaining the hip lifting and swinging motion. In the later stage of the video, the model covered her chest with her hand and danced in front of the camera, with smooth and slow dance movements and gentle movements, from a positive perspective.

Directly output the specific description of this storyboard without any further explanation.`;

export async function optimizePrompt(prompt: string): Promise<string> {
  const response = await apiKy
    .post(OPTIMIZE_PROMPT_API, {
      json: {
        model: "gpt-4o-2024-11-20",
        stream: false,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
    })
    .json<OptimizedPromptResponse>();

  return response.choices[0].message.content;
}
