"use client";

import { Select as BaseSelect } from "@base-ui/react/select";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  icon?: ReactNode;
}

export function Select({
  value,
  onValueChange,
  options,
  placeholder = "Select...",
  className,
  icon,
}: SelectProps) {
  const handleValueChange = (newValue: string | null) => {
    if (newValue !== null) {
      onValueChange(newValue);
    }
  };

  return (
    <BaseSelect.Root value={value} onValueChange={handleValueChange}>
      <BaseSelect.Trigger
        className={cn(
          "inline-flex items-center justify-between gap-2 px-4 py-2.5",
          "bg-surface border border-border rounded-xl",
          "text-text text-sm font-medium",
          "hover:border-border-hover hover:bg-surface-hover",
          "focus-ring transition-all duration-200",
          "min-w-[160px]",
          className,
        )}
      >
        {icon && <span className="text-text-muted">{icon}</span>}
        <BaseSelect.Value placeholder={placeholder} />
        <BaseSelect.Icon className="text-text-muted">
          <ChevronDownIcon />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={8} alignItemWithTrigger={false}>
          <BaseSelect.Popup
            className={cn(
              "min-w-[160px] py-1.5",
              "bg-surface border border-border rounded-xl",
              "shadow-lg backdrop-blur-xl",
              "animate-scale-in origin-top",
            )}
          >
            <BaseSelect.List className="outline-none">
              {options.map((option) => (
                <BaseSelect.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 cursor-pointer outline-none",
                    "text-sm text-text",
                    "hover:bg-surface-hover",
                    "data-[selected]:bg-primary/10 data-[selected]:text-primary",
                    "transition-colors duration-150",
                  )}
                >
                  <BaseSelect.ItemIndicator className="w-4">
                    <CheckIcon />
                  </BaseSelect.ItemIndicator>
                  <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8L6.5 11.5L13 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
