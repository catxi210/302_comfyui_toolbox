import { StyleTransferFormType } from "@/components/forms/specific-form/style-transfer/schema";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const STORAGE_KEY = "style-transfer-form";

export const defaultState: StyleTransferFormType = {
  oriImageFile: "",
  refImageFile: "",
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

export const styleTransferFormStore = atomWithStorage<StyleTransferFormType>(
  STORAGE_KEY,
  defaultState,
  createJSONStorage(() => createStorage()),
  { getOnInit: true }
);
