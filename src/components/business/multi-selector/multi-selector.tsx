"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Select, { MultiValue } from "react-select";
import { toast } from "sonner";

export type OptionType = { value: string; label: string };

interface MultiSelectorProps {
  options: OptionType[];
  onChange: (selectedOptions: MultiValue<OptionType>) => void;
  label?: string;
  defaultValue?: OptionType[];
  value?: OptionType[];
  maxItems?: number;
  placeholder?: string;
  menuPlacement?: "top" | "bottom" | "auto";
  className?: string;
}

export function MultiSelector({
  options,
  onChange,
  label,
  defaultValue,
  value,
  maxItems,
  placeholder,
  menuPlacement = "top",
  className,
}: MultiSelectorProps) {
  const t = useTranslations("multi_selector");

  const handleChange = (selectedOptions: MultiValue<OptionType>) => {
    if (maxItems && selectedOptions.length > maxItems) {
      toast.warning(`${t("max_items_exceeded")}: ${maxItems}`);

      return;
    }
    onChange(selectedOptions);
  };

  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      {label && <Label>{label}</Label>}
      <Select
        options={options}
        onChange={handleChange}
        defaultValue={defaultValue}
        value={value}
        isMulti
        menuPlacement={menuPlacement}
        placeholder={placeholder}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            cursor: "pointer",
            borderRadius: "0.375rem",
            borderColor: state.isFocused
              ? "hsl(var(--ring))"
              : "hsl(var(--input))",
            backgroundColor: "transparent",
            "&:focus": {
              borderColor: "hsl(var(--ring))",
            },
            "&:hover": {
              borderColor: "none",
            },
            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            fontSize: "0.875rem",
            minHeightheight: "2.25rem",
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.375rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            zIndex: 50,
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused
              ? "hsl(var(--accent))"
              : "transparent",
            color: state.isFocused
              ? "hsl(var(--accent-foreground))"
              : "hsl(var(--popover-foreground))",
            fontSize: "0.875rem",
            padding: "0.375rem 0.5rem",
            cursor: "default",
            "&:active": {
              backgroundColor: "hsl(var(--accent))",
            },
          }),
          multiValue: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "hsl(var(--accent))",
            borderRadius: "0.25rem",
          }),
          multiValueLabel: (baseStyles) => ({
            ...baseStyles,
            color: "hsl(var(--accent-foreground))",
            fontSize: "0.875rem",
            padding: "0.125rem",
          }),
          multiValueRemove: (baseStyles) => ({
            ...baseStyles,
            color: "hsl(var(--accent-foreground))",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.1)",
              color: "hsl(var(--accent-foreground))",
            },
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            fontWeight: "500",
            color: "hsl(var(--muted-foreground))",
          }),
        }}
      />
    </div>
  );
}
