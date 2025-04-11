import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ModeSelectorProps {
  label?: string;
  value: string;
  leftItemName: string;
  leftItemValue: string;
  rightItemName: string;
  rightItemValue: string;
  onValueChange: (value: string) => void;
}

export function ModeSelector({
  label,
  value,
  leftItemName,
  leftItemValue,
  rightItemName,
  rightItemValue,
  onValueChange,
}: ModeSelectorProps) {
  return (
    <div className="flex flex-row items-center justify-between">
      {label && <span className="text-sm font-medium">{label}</span>}
      <Tabs value={value} onValueChange={onValueChange}>
        <TabsList className="flex flex-row">
          <TabsTrigger value={leftItemValue}>
            <span className="text-sm">{leftItemName}</span>
          </TabsTrigger>
          <TabsTrigger value={rightItemValue}>
            <span className="text-sm">{rightItemName}</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
