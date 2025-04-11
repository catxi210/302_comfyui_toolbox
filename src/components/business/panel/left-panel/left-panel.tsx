"use client";

import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAtom } from "jotai";
import { UiStoreActiveTab, uiStoreAtom } from "@/stores/slices/ui.store";
import { cn } from "@/lib/utils";
import { ImageTabContent } from "./tab-content/image-tab-content";
import { WorkflowType } from "@/type";
import { VideoTabContent } from "./tab-content/video-tab-content";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/global/use-mobile";

const TABS_TRIGGER_CLASS =
  "relative w-full rounded-none py-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 after:ease-out data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:w-full data-[state=active]:after:bg-primary";

interface LeftPanelProps {
  onDrawerClicked?: () => void;
}

export function LeftPanel({ onDrawerClicked }: LeftPanelProps) {
  const t = useTranslations("left_panel");

  const isMobile = useIsMobile();

  const [uiStore, setUiStore] = useAtom(uiStoreAtom);

  const getTabTextClass = (tabValue: UiStoreActiveTab) => {
    return cn(
      "text-sm font-medium",
      uiStore.activeTab === tabValue && "text-primary"
    );
  };

  const handleValueChange = (value: string) => {
    setUiStore((prev) => ({
      ...prev,
      activeWorkflow: value as WorkflowType,
    }));
  };

  return (
    <div className="relative flex size-full">
      <Tabs
        className="flex size-full flex-col gap-y-6"
        defaultValue={uiStore.activeTab}
        onValueChange={(value) =>
          setUiStore((prev) => ({
            ...prev,
            activeTab: value as UiStoreActiveTab,
          }))
        }
        value={uiStore.activeTab}
      >
        <TabsList
          className={cn(
            "flex flex-row justify-between rounded-none bg-transparent p-0",
            isMobile ? "w-fit" : "w-full"
          )}
        >
          <TabsTrigger className={TABS_TRIGGER_CLASS} value="image">
            <span className={getTabTextClass("image")}>{t("tabs.image")}</span>
          </TabsTrigger>
          <TabsTrigger className={TABS_TRIGGER_CLASS} value="video">
            <span className={getTabTextClass("video")}>{t("tabs.video")}</span>
          </TabsTrigger>
        </TabsList>

        <div className="flex-1">
          <TabsContent className="mt-0 h-full" value="image">
            <ImageTabContent
              activeWorkflow={uiStore.activeWorkflow}
              onValueChange={handleValueChange}
            />
          </TabsContent>
          <TabsContent className="mt-0 h-full" value="video">
            <VideoTabContent />
          </TabsContent>
        </div>
      </Tabs>

      {isMobile && (
        <Button
          className="absolute right-0 top-0 size-12 [&_svg]:!size-6"
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => {
            onDrawerClicked?.();
          }}
        >
          <History />
        </Button>
      )}
    </div>
  );
}
