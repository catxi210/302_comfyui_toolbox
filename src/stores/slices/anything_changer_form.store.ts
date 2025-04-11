import { AnythingChangerFormType } from "@/components/forms/specific-form/anything-changer/schema";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const STORAGE_KEY = "anything-changer-form";

export const defaultState: AnythingChangerFormType = {
  mode: "description",
  sourceImageFile: "",
  targetImageFile: "",
  sourceDescription: "",
  targetDescription: "",
  sourceMaskLines: [],
  targetMaskLines: [],
  smallObject: false,
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

export const anythingChangerFormStore =
  atomWithStorage<AnythingChangerFormType>(
    STORAGE_KEY,
    defaultState,
    createJSONStorage(() => createStorage()),
    { getOnInit: true }
  );
