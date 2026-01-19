import { clsx, type ClassValue } from "clsx";

/**
 * Utility function to merge class names
 * Uses clsx for conditional class joining
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
