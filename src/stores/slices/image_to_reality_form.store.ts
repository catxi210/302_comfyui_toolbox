import { ImageToRealityFormType } from "@/components/forms/specific-form/image-to-reality/schema";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const STORAGE_KEY = "image-to-reality-form";

export const defaultState: ImageToRealityFormType = {
  imageFile: "",
  targetType: "0",
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

export const imageToRealityFormStore = atomWithStorage<ImageToRealityFormType>(
  STORAGE_KEY,
  defaultState,
  createJSONStorage(() => createStorage()),
  { getOnInit: true }
);
