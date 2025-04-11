"use client";

import {
  ToolbarButton,
  ToolbarRoot,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from "@/components/ui/toolbar";
import { cn } from "@/lib/utils";
import { FaEraser } from "react-icons/fa";
import { RiMarkPenFill } from "react-icons/ri";
import { TbWashDryclean } from "react-icons/tb";
import { BrushMode } from "./type";
import { Slider } from "@/components/ui/slider";
import { useIsMobile } from "@/hooks/global/use-mobile";
import { GrPowerReset } from "react-icons/gr";
import { useCallback, useState } from "react";
import { debounce } from "lodash";

interface PaintToolbarProps {
  isEraser: boolean;
  brushSize: number[];
  onModeChange: (mode: BrushMode) => void;
  onBrushSizeChange: (value: number[]) => void;
  onReset: () => void;
}

export function PaintToolbar({
  isEraser,
  brushSize,
  onModeChange,
  onBrushSizeChange,
  onReset,
}: PaintToolbarProps) {
  const isMobile = useIsMobile();

  const [isSliding, setIsSliding] = useState(false);

  const brushMode = isEraser ? "eraser" : "brush";

  const setIsSlidingWithDelay = debounce(() => {
    setIsSliding(false);
  }, 500);

  const handleBrushSizeChange = useCallback(
    (value: number[]) => {
      setIsSliding(true);
      onBrushSizeChange(value);
      setIsSlidingWithDelay();
    },
    [onBrushSizeChange, setIsSlidingWithDelay]
  );

  return (
    <ToolbarRoot
      className={cn(
        "justify-start self-center p-2",
        isMobile ? "w-full" : "w-1/2"
      )}
    >
      <ToolbarToggleGroup
        type="single"
        value={brushMode}
        onValueChange={onModeChange}
      >
        <ToolbarToggleItem value="brush">
          <RiMarkPenFill
            className={cn("h-4 w-4", brushMode === "brush" && "text-primary")}
          />
        </ToolbarToggleItem>
        <ToolbarToggleItem value="eraser">
          <FaEraser
            className={cn("h-4 w-4", brushMode === "eraser" && "text-primary")}
          />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>

      <ToolbarSeparator />

      <div className="flex w-full flex-row gap-x-2 px-2">
        <TbWashDryclean
          className={cn("h-5 w-5", isSliding ? "text-primary" : "")}
        />
        <Slider
          value={brushSize}
          min={1}
          max={50}
          step={1}
          onValueChange={handleBrushSizeChange}
        />
      </div>

      <ToolbarSeparator />

      <ToolbarButton
        variant="ghost"
        size="icon"
        className="group px-4"
        onClick={onReset}
      >
        <GrPowerReset className="h-5 w-5 group-hover:text-primary" />
      </ToolbarButton>
    </ToolbarRoot>
  );
}
