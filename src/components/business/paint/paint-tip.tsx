"use client";

import { AiOutlineQuestionCircle } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/global/use-mobile";
import { FaArrowRight, FaArrowDown } from "react-icons/fa6";
import { useState } from "react";
import { RiMarkPenFill } from "react-icons/ri";
import { FaEraser } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Image from "next/image";
import tip from "@/public/images/global/tip.png";
import tip2 from "@/public/images/global/tip2.png";

export function PaintTip() {
  const t = useTranslations("left_panel.paint");

  const isMobile = useIsMobile();

  const [showTip, setShowTip] = useState(false);

  const handleShowTip = () => {
    setShowTip(true);
  };

  return (
    <>
      <AiOutlineQuestionCircle
        className="cursor-pointer text-primary hover:text-primary/80"
        onClick={handleShowTip}
      />

      <Dialog open={showTip} onOpenChange={setShowTip}>
        <DialogContent
          className={cn(
            "overflow-y-auto",
            isMobile ? "max-h-[90vh] max-w-[90vw]" : "max-h-[90vh] max-w-[70vw]"
          )}
        >
          <DialogTitle>{t("tip_title")}</DialogTitle>

          <DialogDescription>{t("tip_description")}</DialogDescription>
          <div className="flex flex-row items-center">
            <DialogDescription>{t("tip_description_brush")}</DialogDescription>
            <RiMarkPenFill className="text-muted-foreground" />
          </div>
          <div className="flex flex-row items-center">
            <DialogDescription>{t("tip_description_eraser")}</DialogDescription>
            <FaEraser className="text-muted-foreground" />
          </div>

          <div
            className={cn("flex gap-4", isMobile ? "flex-col" : "flex-row")}
            style={{ height: isMobile ? "100vh" : "60vh" }}
          >
            <div className="relative flex-1 rounded-md border border-border bg-muted">
              <Image
                className="object-contain"
                src={tip}
                alt="paint example image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>

            {isMobile ? (
              <FaArrowDown className="self-center text-muted-foreground" />
            ) : (
              <FaArrowRight className="self-center text-muted-foreground" />
            )}

            <div className="relative flex-1 rounded-md border border-border bg-muted">
              <Image
                className="object-contain"
                src={tip2}
                alt="result image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
