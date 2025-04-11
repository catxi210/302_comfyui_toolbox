"use client";

import { RiMarkPenFill } from "react-icons/ri";
import { FaEraser } from "react-icons/fa";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { BrushMode } from "./type";
import { createScopedLogger } from "@/utils";
import { PaintTip } from "./paint-tip";

interface PaintModeToggleGroupProps {
  className?: string;
  value: BrushMode;
  onModeChange: (mode: BrushMode) => void;
}

const logger = createScopedLogger("PaintModeToggleGroup");

export function PaintModeToggleGroup({
  className,
  value,
  onModeChange,
}: PaintModeToggleGroupProps) {
  const t = useTranslations("left_panel.paint");

  const handleValueChange = (value: string) => {
    const newMode = value as BrushMode;
    onModeChange(newMode);

    logger.debug("current brush mode: ", newMode);
  };

  return (
    <div
      className={cn("flex flex-row items-center justify-between", className)}
    >
      <div className="flex flex-row items-center gap-x-2">
        <Label>{t("toggle_group.label")}</Label>
        <PaintTip />
      </div>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={handleValueChange}
      >
        <ToggleGroupItem value="brush" aria-label="brush">
          <RiMarkPenFill
            className={cn("h-4 w-4", value === "brush" && "text-primary")}
          />
        </ToggleGroupItem>
        <ToggleGroupItem value="eraser" aria-label="eraser">
          <FaEraser
            className={cn("h-4 w-4", value === "eraser" && "text-primary")}
          />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
