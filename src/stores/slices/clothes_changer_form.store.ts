import { ClothesChangerFormType } from "@/components/forms/specific-form/clothes-changer/schema";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const STORAGE_KEY = "clothes-changer-form";

export const defaultState: ClothesChangerFormType = {
  mode: "label",
  modelImageFile: "",
  clothesImageFile: "",
  modelImgSegLabels: ["10"],
  clothesImgSegLabels: ["10"],
  modelMaskLines: [],
  clothesMaskLines: [],
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

export const clothesChangerFormStore = atomWithStorage<ClothesChangerFormType>(
  STORAGE_KEY,
  defaultState,
  createJSONStorage(() => createStorage()),
  { getOnInit: true }
);
