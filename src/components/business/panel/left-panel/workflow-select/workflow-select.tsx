"use client";

import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GLOBAL } from "@/constants/values";

interface WorkflowSelectProps {
  onValueChange: (value: string) => void;
  defaultValue?: string;
}

export function WorkflowSelect({
  onValueChange,
  defaultValue,
}: WorkflowSelectProps) {
  const t = useTranslations("left_panel.workflow_select");

  return (
    <Select value={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {GLOBAL.WORKFLOWS.SUPPORTED.map((workflow: string) => (
          <SelectItem key={workflow} value={workflow}>
            {t(`${workflow}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
