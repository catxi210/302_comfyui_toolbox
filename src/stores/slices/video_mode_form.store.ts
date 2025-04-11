import { VideoModeFormType } from "@/components/forms/specific-form/video-mode/schema";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const STORAGE_KEY = "video-mode-form";

export const defaultState: VideoModeFormType = {
  imageFile: "",
  cameraLanguage: "",
  expression: "",
  emotion: "",
  industry: "",
  actions: [],
  restrictiveWords: [],
  optimization: true,
  resolution: "std",
  extraRequest: "",
};

const createStorage = () => {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => null,
      removeItem: () => null,
    };
  }

  const existingData = sessionStorage.getItem(STORAGE_KEY);
  if (!existingData) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
  }

  return sessionStorage;
};

export const videoModeFormStore = atomWithStorage<VideoModeFormType>(
  STORAGE_KEY,
  defaultState,
  createJSONStorage(() => createStorage()),
  { getOnInit: true }
);
