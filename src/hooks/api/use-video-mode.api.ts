import { useCallback, useState } from "react";
import { UseFormWatch } from "react-hook-form";
import { createScopedLogger } from "@/utils";
import { db } from "@/db";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { VideoModeFormType } from "@/components/forms/specific-form/video-mode/schema";
import { createVideoModeTask } from "@/services/video-mode";
import dedent from "dedent";
import { optimizePrompt } from "@/services/chat";

const logger = createScopedLogger("useVideoModeApi");

interface UseVideoModeApiProps {
  getValues: UseFormWatch<VideoModeFormType>;
  validateForm: (formData: VideoModeFormType) => void;
}

const formatPrompt = (formData: VideoModeFormType): string => {
  const {
    cameraLanguage,
    expression,
    emotion,
    actions,
    restrictiveWords,
    extraRequest,
  } = formData;

  const cameraLanguagePrompt = `Camera Language: ${cameraLanguage}`;
  const expressionPrompt = `Character Expression: ${expression}`;
  const emotionPrompt = `Emotional Expression: ${emotion}`;
  const actionsPrompt = `Character Action: ${actions.join(" ")}`;
  const restrictiveWordsPrompt = `Restrictive Words: ${restrictiveWords.join(" ")}`;
  const extraRequestPrompt = extraRequest
    ? `Extra Request: ${extraRequest}`
    : "";

  return dedent`
    ${cameraLanguagePrompt}
    ${expressionPrompt}
    ${emotionPrompt}
    ${actionsPrompt}
    ${restrictiveWordsPrompt}
    ${extraRequestPrompt}
  `;
};

const getImageAspectRatio = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      const { naturalWidth: width, naturalHeight: height } = img;
      const ratio = width / height;
      if (ratio === 1) {
        resolve("1:1");
      } else if (ratio > 1) {
        resolve("16:9");
      } else {
        resolve("9:16");
      }
    };
    img.onerror = function () {
      reject(new Error("Failed to load image"));
    };
    img.src = imageUrl;
  });
};

export function useVideoModeApi({
  getValues,
  validateForm,
}: UseVideoModeApiProps) {
  const t = useTranslations("left_panel.hooks.use_api");

  const [isCreating, setIsCreating] = useState(false);

  const handleProcessTask = useCallback(async () => {
    if ((await db.getRunningTasksCount()) > 3) {
      toast.error(t("exceeding_concurrency limit"));

      return;
    }

    setIsCreating(true);

    const formData = getValues();
    logger.debug("useVideoModeApi form data:", formData);

    validateForm(formData);

    const {
      imageFile,
      cameraLanguage,
      expression,
      emotion,
      industry,
      actions,
      restrictiveWords,
      optimization,
      resolution,
      extraRequest,
    } = formData;

    try {
      const aspectRatio = await getImageAspectRatio(imageFile);

      let prompt = formatPrompt(formData);
      if (optimization) {
        prompt = await optimizePrompt(prompt);
      }

      const taskId = await createVideoModeTask({
        imageFile: imageFile,
        prompt: prompt + "/n Released on the Tiktok platform.",
        aspectRatio: aspectRatio,
        resolution: resolution,
      });

      await db.addVideoModeTask({
        taskId: taskId,
        input: {
          imageFile: imageFile,
          cameraLanguage: cameraLanguage,
          expression: expression,
          emotion: emotion,
          industry: industry,
          actions: actions,
          restrictiveWords: restrictiveWords,
          optimization: optimization,
          resolution: resolution,
          extraRequest: extraRequest,
        },
        output: "",
        status: "RUNNING",
        attempt: 0,
        queuePosition: 0,
        isDeleted: false,
      });
    } catch (error) {
      logger.error("useStyleTransferApi error:", error);

      toast.error(t("error_occurred"));
    } finally {
      setIsCreating(false);
    }
  }, [getValues, t, validateForm]);

  return { isCreating, handleProcessTask };
}
