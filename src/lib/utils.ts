import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally join class names.
 * Combines `clsx` and `tailwind-merge` for better class merging.
 *
 * @param inputs - Class values to be conditionally merged.
 * @returns A string of combined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
