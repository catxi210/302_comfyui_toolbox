"use client";

import { uiStoreAtom } from "@/stores/slices/ui.store";
import { useAtom } from "jotai";
import { ImageHistoryInterface } from "./specific-interface.tsx/image-history-interface";
import { VideoHistoryInterface } from "./specific-interface.tsx/video-history-interface";
import { useIsMobile } from "@/hooks/global/use-mobile";

export function HistoryInterface() {
  const isMobile = useIsMobile();
  const [uiStore, setUiStore] = useAtom(uiStoreAtom);

  if (uiStore.activeTab === "image") {
    return (
      <ImageHistoryInterface
        activeWorkflow={uiStore.activeWorkflow}
        onVideoClick={() =>
          setUiStore({
            ...uiStore,
            activeTab: "video",
            drawerOpen: isMobile ? false : uiStore.drawerOpen,
          })
        }
      />
    );
  }

  return <VideoHistoryInterface />;
}
