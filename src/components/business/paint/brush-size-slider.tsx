import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface BrushSizeSliderProps {
  className?: string;
  value: number[];
  max?: number;
  min?: number;
  step?: number;
  onBrushSizeChange: (value: number[]) => void;
}

export function BrushSizeSlider({
  className,
  value,
  max = 100,
  min = 1,
  step = 1,
  onBrushSizeChange,
}: BrushSizeSliderProps) {
  const t = useTranslations("left_panel.paint");

  return (
    <div
      className={cn("flex flex-row items-center justify-between", className)}
    >
      <Label>{t("brush_size_slider.label")}</Label>
      <Slider
        className="w-2/3"
        value={value}
        max={max}
        min={min}
        step={step}
        onValueChange={onBrushSizeChange}
      />
    </div>
  );
}
