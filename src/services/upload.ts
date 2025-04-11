import { z } from "zod";
import { apiKy } from "@/api";
import ky from "ky";

const UPLOAD_IMAGE_API_URL = "302/upload-file";

export const uploadImageSchema = z.object({
  code: z.number(),
  data: z.string().url(),
  message: z.string(),
});
export type UploadImageResponse = z.infer<typeof uploadImageSchema>;

export async function uploadImage(
  imageUrl: string
): Promise<UploadImageResponse> {
  const imageData = await ky.get(imageUrl).blob();
  const imageFile = new File([imageData], "image.jpg", {
    type: imageData.type,
  });

  const formData = new FormData();
  formData.append("file", imageFile);

  return await apiKy
    .post(UPLOAD_IMAGE_API_URL, {
      body: formData,
    })
    .json<UploadImageResponse>();
}
