"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaVideo, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

interface ActionGroupProps {
  onVideoClick: () => void;
  onDownloadClick: () => void;
  onDeleteClick: () => void;

  isShowVideo?: boolean;
  isShowDownload?: boolean;
  isShowDelete?: boolean;
}

interface ActionButton {
  icon: ReactNode;
  tooltip: string;
  onClick: () => void;
  isShow?: boolean;
}

export function ActionGroup({
  onVideoClick,
  onDownloadClick,
  onDeleteClick,

  isShowVideo = true,
  isShowDownload = true,
  isShowDelete = true,
}: ActionGroupProps) {
  const t = useTranslations("right_panel.history_card.action_group");

  const actionButtons: ActionButton[] = [
    {
      icon: <FaVideo className="text-primary" />,
      tooltip: t("video"),
      onClick: onVideoClick,
      isShow: isShowVideo,
    },
    {
      icon: <MdOutlineFileDownload className="text-green-600" />,
      tooltip: t("download"),
      onClick: onDownloadClick,
      isShow: isShowDownload,
    },
    {
      icon: <FaRegTrashAlt className="text-destructive" />,
      tooltip: t("delete"),
      onClick: onDeleteClick,
      isShow: isShowDelete,
    },
  ];

  return (
    <TooltipProvider>
      <div className="flex flex-row">
        {actionButtons.map((button, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              {button.isShow && (
                <Button
                  className="size-8"
                  variant="ghost"
                  type="button"
                  size="icon"
                  onClick={button.onClick}
                >
                  {button.icon}
                </Button>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{button.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
