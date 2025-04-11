"use client";

import { LoadingIcon } from "@/components/business/icon/loading-icon";
import { Label } from "@/components/ui/label";
import { TaskStatus } from "@/type";
import { useTranslations } from "next-intl";
import { PiImageBrokenDuotone } from "react-icons/pi";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/global/use-mobile";

interface HistoryCardProps {
  label: string;
  inputUrl?: { original: string; target: string };
  mediaUrl: string;
  mediaType: "image" | "video";
  taskStatus: TaskStatus;
}

export function HistoryCard({
  label,
  inputUrl,
  mediaUrl,
  mediaType,
  taskStatus,
}: HistoryCardProps) {
  const t = useTranslations("right_panel.history_card");
  const [showFullMedia, setShowFullMedia] = useState(false);

  const isMobile = useIsMobile();

  const getLoadingText = (status: TaskStatus) => {
    switch (status) {
      case "SUBMITTING":
        return t("submitting");
      case "QUEUED":
        return t("queued");
      case "RUNNING":
        return t("running");
      default:
        return "";
    }
  };

  const renderMedia = () => {
    if (taskStatus === "FAILED") {
      return <PiImageBrokenDuotone className="h-10 w-10 text-destructive" />;
    }

    if (!mediaUrl) {
      return <LoadingIcon text={getLoadingText(taskStatus)} />;
    }

    if (mediaType === "video") {
      return (
        <video
          className="h-full w-full cursor-pointer rounded-lg object-contain"
          src={mediaUrl}
          controls
        />
      );
    }

    return (
      <Image
        className="cursor-pointer rounded-lg object-contain"
        src={mediaUrl}
        alt="Image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        onClick={() => setShowFullMedia(true)}
      />
    );
  };

  return (
    <>
      <div className="flex h-[300px] flex-1 flex-col gap-y-2">
        <Label className="text-muted-foreground">{label}</Label>
        <div
          className={cn(
            "relative flex h-[300px] items-center justify-center rounded-lg border border-border bg-muted transition-all duration-100 hover:scale-105 hover:border-primary",
            taskStatus === "FAILED" && "hover:border-destructive"
          )}
        >
          {renderMedia()}
        </div>
      </div>

      <Dialog open={showFullMedia} onOpenChange={setShowFullMedia}>
        <DialogContent
          className={
            isMobile ? "max-h-[80vh] max-w-[90vw]" : "max-h-[80vh] max-w-[80vw]"
          }
        >
          <DialogTitle className="hidden" />
          <DialogDescription className="hidden" />

          <div
            className={cn(
              "mt-4 flex gap-4",
              isMobile ? "flex-col" : "flex-row"
            )}
            style={{ height: "70vh" }}
          >
            <div className="relative flex-1 rounded-md border border-border bg-muted">
              <Image
                className="object-contain"
                src={inputUrl?.original || ""}
                alt="input image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              <div className="absolute bottom-1 right-1 rounded-md bg-black/20 px-2 py-1 text-sm text-white backdrop-blur">
                {t("input_url")}
              </div>
            </div>
            <div
              className={cn(
                "relative flex-1 rounded-md border border-border bg-muted",
                inputUrl?.target === "" && "hidden"
              )}
            >
              <Image
                className="object-contain"
                src={inputUrl?.target || ""}
                alt="target image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              <div className="absolute bottom-1 right-1 rounded-md bg-black/20 px-2 py-1 text-sm text-white backdrop-blur">
                {t("output_target_url")}
              </div>
            </div>
            <div className="relative flex-1 rounded-md border border-border bg-muted">
              <Image
                className="object-contain"
                src={mediaUrl}
                alt="media image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              <div className="absolute bottom-1 right-1 rounded-md bg-black/20 px-2 py-1 text-sm text-white backdrop-blur">
                {t("output_url")}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
