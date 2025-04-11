import { FaceSwapperFormType } from "@/components/forms/specific-form/face-swapper/schema";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const STORAGE_KEY = "face-swapper-form";

export const defaultState: FaceSwapperFormType = {
  faceImageFile: "",
  targetImageFile: "",
  filmFilter: true,
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

export const faceSwapperFormStore = atomWithStorage<FaceSwapperFormType>(
  STORAGE_KEY,
  defaultState,
  createJSONStorage(() => createStorage()),
  { getOnInit: true }
);
