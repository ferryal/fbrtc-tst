import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeVariant = "success" | "warning" | "error" | "info" | "default";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-success/15 text-success border-success/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  error: "bg-error/15 text-error border-error/30",
  info: "bg-info/15 text-info border-info/30",
  default: "bg-surface-hover text-text-muted border-border",
};

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border",
        "transition-colors duration-200",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// Availability-specific badge
interface AvailabilityBadgeProps {
  status: "In Stock" | "Low Stock" | "Out of Stock";
  className?: string;
}

export function AvailabilityBadge({
  status,
  className,
}: AvailabilityBadgeProps) {
  const variants: Record<string, BadgeVariant> = {
    "In Stock": "success",
    "Low Stock": "warning",
    "Out of Stock": "error",
  };

  return (
    <Badge variant={variants[status]} className={className}>
      <span className="relative flex h-2 w-2 mr-1.5">
        <span
          className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            status === "In Stock" && "bg-success",
            status === "Low Stock" && "bg-warning",
            status === "Out of Stock" && "bg-error",
          )}
        />
        <span
          className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            status === "In Stock" && "bg-success",
            status === "Low Stock" && "bg-warning",
            status === "Out of Stock" && "bg-error",
          )}
        />
      </span>
      {status}
    </Badge>
  );
}
