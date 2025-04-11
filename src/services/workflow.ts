import { apiKy } from "@/api";
import ky from "ky";
import { z } from "zod";
import { dataURLToBlob } from "blob-util";

export const createTaskSchema = z.object({
  code: z.number(),
  msg: z.string(),
  data: z.object({
    taskId: z.string(),
  }),
});
export type CreateTaskResponse = z.infer<typeof createTaskSchema>;

const CREATE_CLOTHES_CHANGER_API_URL =
  "302/comfyui/clothes-changer/create-task";
const CREATE_CLOTHES_CHANGER_UPLOAD_MASK_API_URL =
  "302/comfyui/clothes-changer/create-task-upload-mask";
const CREATE_FACE_SWAPPER_API_URL = "302/comfyui/face-swapper/create-task";
const CREATE_IMAGE_TO_REALITY_API_URL =
  "302/comfyui/image-to-reality/create-task";
const CREATE_ANYTHING_CHANGER_API_URL =
  "302/comfyui/anything-changer/create-task";
const CREATE_ANYTHING_CHANGER_UPLOAD_MASK_API_URL =
  "302/comfyui/anything-changer/create-task-upload-mask";
const CREATE_STYLE_TRANSFER_API_URL = "302/comfyui/style-transfer/create-task";

export async function createClothesChangerTask(params: {
  clothesImageFile: string;
  clothesImgSegLabels: string;
  modelImageFile: string;
  modelImgSegLabels: string;
}): Promise<string> {
  const {
    clothesImageFile,
    clothesImgSegLabels,
    modelImageFile,
    modelImgSegLabels,
  } = params;
  const [clothesImageBlob, modelImageBlob] = await Promise.all([
    ky.get(clothesImageFile).blob(),
    ky.get(modelImageFile).blob(),
  ]);
  const clothesImageFile_ = new File([clothesImageBlob], `clothesImage.jpg`, {
    type: clothesImageBlob.type,
  });
  const modelImageFile_ = new File([modelImageBlob], `modelImage.jpg`, {
    type: modelImageBlob.type,
  });

  const formData = new FormData();
  formData.append("clothesImageFile", clothesImageFile_);
  formData.append("clothesImgSegLabels", clothesImgSegLabels);
  formData.append("modelImageFile", modelImageFile_);
  formData.append("modelImgSegLabels", modelImgSegLabels);

  const response = await apiKy
    .post(CREATE_CLOTHES_CHANGER_API_URL, {
      body: formData,
    })
    .json<CreateTaskResponse>();

  return response.data.taskId;
}

export async function createClothesChangerUploadMaskTask(params: {
  clothesImageFile: string;
  clothesMaskFile: string;
  modelImageFile: string;
  modelMaskFile: string;
}): Promise<string> {
  const { clothesImageFile, modelImageFile, clothesMaskFile, modelMaskFile } =
    params;

  const [clothesImageBlob, modelImageBlob] = await Promise.all([
    ky.get(clothesImageFile).blob(),
    ky.get(modelImageFile).blob(),
  ]);

  const clothesMaskBlob = dataURLToBlob(clothesMaskFile);
  const modelMaskBlob = dataURLToBlob(modelMaskFile);

  const clothesImageFile_ = new File([clothesImageBlob], `clothesImage.jpg`, {
    type: clothesImageBlob.type,
  });
  const modelImageFile_ = new File([modelImageBlob], `modelImage.jpg`, {
    type: modelImageBlob.type,
  });
  const clothesMaskFile_ = new File([clothesMaskBlob], `clothesMask.jpg`, {
    type: clothesImageBlob.type,
  });
  const modelMaskFile_ = new File([modelMaskBlob], `modelMask.jpg`, {
    type: modelImageBlob.type,
  });

  const formData = new FormData();
  formData.append("modelImageFile", modelImageFile_);
  formData.append("clothesImageFile", clothesImageFile_);
  formData.append("modelMaskFile", modelMaskFile_);
  formData.append("clothesMaskFile", clothesMaskFile_);

  const response = await apiKy
    .post(CREATE_CLOTHES_CHANGER_UPLOAD_MASK_API_URL, {
      body: formData,
    })
    .json<CreateTaskResponse>();

  return response.data.taskId;
}

export async function createFaceSwapperTask(params: {
  faceImageFile: string;
  targetImageFile: string;
  filmFilter: boolean;
}): Promise<string> {
  const { faceImageFile, targetImageFile, filmFilter } = params;
  const [faceImageData, targetImageData] = await Promise.all([
    ky.get(faceImageFile).blob(),
    ky.get(targetImageFile).blob(),
  ]);
  const faceImageFile_ = new File([faceImageData], `faceImage.jpg`, {
    type: faceImageData.type,
  });
  const targetImageFile_ = new File([targetImageData], `targetImage.jpg`, {
    type: targetImageData.type,
  });

  const formData = new FormData();
  formData.append("faceImageFile", faceImageFile_);
  formData.append("targetImageFile", targetImageFile_);
  formData.append("filmFilter", filmFilter ? "1" : "0");

  const response = await apiKy
    .post(CREATE_FACE_SWAPPER_API_URL, {
      body: formData,
    })
    .json<CreateTaskResponse>();

  return response.data.taskId;
}

export async function createImageToRealityTask(params: {
  imageFileUrl: string;
  targetType: string;
}): Promise<string> {
  const { imageFileUrl, targetType } = params;
  const imageData = await ky.get(imageFileUrl).blob();
  const imageFile = new File([imageData], `image.jpg`, {
    type: imageData.type,
  });

  const formData = new FormData();
  formData.append("imageFile", imageFile);
  formData.append("targetType", targetType);

  const response = await apiKy
    .post(CREATE_IMAGE_TO_REALITY_API_URL, {
      body: formData,
    })
    .json<CreateTaskResponse>();

  return response.data.taskId;
}

export async function createAnythingChangerTask(params: {
  sourceImageFile: string;
  targetImageFile: string;
  sourceDescription: string;
  targetDescription: string;
  smallObject: boolean;
}): Promise<string> {
  const {
    sourceImageFile,
    targetImageFile,
    sourceDescription,
    targetDescription,
    smallObject,
  } = params;
  const [sourceImageData, targetImageData] = await Promise.all([
    ky.get(sourceImageFile).blob(),
    ky.get(targetImageFile).blob(),
  ]);
  const sourceImageFile_ = new File([sourceImageData], `sourceImage.jpg`, {
    type: sourceImageData.type,
  });
  const targetImageFile_ = new File([targetImageData], `targetImage.jpg`, {
    type: targetImageData.type,
  });

  const formData = new FormData();
  formData.append("sourceImageFile", sourceImageFile_);
  formData.append("targetImageFile", targetImageFile_);
  formData.append("sourceDescription", sourceDescription);
  formData.append("targetDescription", targetDescription);
  formData.append("smallObject", smallObject ? "1" : "0");

  const response = await apiKy
    .post(CREATE_ANYTHING_CHANGER_API_URL, {
      body: formData,
    })
    .json<CreateTaskResponse>();

  return response.data.taskId;
}

export async function createAnythingChangerUploadMaskTask(params: {
  sourceImageFile: string;
  targetImageFile: string;
  sourceMaskLines: string;
  targetMaskLines: string;
  smallObject: boolean;
}): Promise<string> {
  const {
    sourceImageFile,
    targetImageFile,
    sourceMaskLines,
    targetMaskLines,
    smallObject,
  } = params;
  const [sourceImageData, targetImageData] = await Promise.all([
    ky.get(sourceImageFile).blob(),
    ky.get(targetImageFile).blob(),
  ]);

  const sourceMaskLinesBlob = dataURLToBlob(sourceMaskLines);
  const targetMaskLinesBlob = dataURLToBlob(targetMaskLines);

  const sourceImageFile_ = new File([sourceImageData], `sourceImage.jpg`, {
    type: sourceImageData.type,
  });
  const targetImageFile_ = new File([targetImageData], `targetImage.jpg`, {
    type: targetImageData.type,
  });
  const sourceMaskFile_ = new File([sourceMaskLinesBlob], `sourceMask.jpg`, {
    type: sourceImageData.type,
  });
  const targetMaskFile_ = new File([targetMaskLinesBlob], `targetMask.jpg`, {
    type: targetImageData.type,
  });

  const formData = new FormData();
  formData.append("sourceImageFile", sourceImageFile_);
  formData.append("targetImageFile", targetImageFile_);
  formData.append("sourceMaskFile", sourceMaskFile_);
  formData.append("targetMaskFile", targetMaskFile_);
  formData.append("smallObject", smallObject ? "1" : "0");

  const response = await apiKy
    .post(CREATE_ANYTHING_CHANGER_UPLOAD_MASK_API_URL, {
      body: formData,
    })
    .json<CreateTaskResponse>();

  return response.data.taskId;
}

export async function createStyleTransferTask(params: {
  oriImageFile: string;
  refImageFile: string;
}): Promise<string> {
  const { oriImageFile, refImageFile } = params;
  const [oriImageData, refImageData] = await Promise.all([
    ky.get(oriImageFile).blob(),
    ky.get(refImageFile).blob(),
  ]);
  const oriImageFile_ = new File([oriImageData], `oriImage.jpg`, {
    type: oriImageData.type,
  });
  const refImageFile_ = new File([refImageData], `refImage.jpg`, {
    type: refImageData.type,
  });

  const formData = new FormData();
  formData.append("oriImageFile", oriImageFile_);
  formData.append("refImageFile", refImageFile_);

  const response = await apiKy
    .post(CREATE_STYLE_TRANSFER_API_URL, {
      body: formData,
    })
    .json<CreateTaskResponse>();

  return response.data.taskId;
}
