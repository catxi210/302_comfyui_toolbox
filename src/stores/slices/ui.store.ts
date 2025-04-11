import { WorkflowType } from "@/type";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export type UiStoreActiveTab = "image" | "video";
export type UiStore = {
  activeTab: UiStoreActiveTab;
  activeWorkflow: WorkflowType;
  drawerOpen: boolean;
};

const STORAGE_KEY = "uiStore";
const defaultState: UiStore = {
  activeTab: "image",
  activeWorkflow: "clothes_changer",
  drawerOpen: false,
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

export const uiStoreAtom = atomWithStorage<UiStore>(
  STORAGE_KEY,
  defaultState,
  createJSONStorage(() => createStorage()),
  {
    getOnInit: true,
  }
);
