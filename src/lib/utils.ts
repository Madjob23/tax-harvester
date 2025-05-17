import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as Indian currency (INR)
 * @param amount The amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a number with appropriate precision
 * Uses scientific notation for very small numbers
 * @param value The number to format
 * @returns Formatted number string
 */
export function formatNumber(value: number): string {
  if (Math.abs(value) < 0.001 && value !== 0) {
    return value.toExponential(2);
  }
  
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  }).format(value);
}

/**
 * Gets nested object property by string path
 * @param obj The object to get the property from
 * @param path The property path (e.g., "stcg.gain")
 * @returns The property value
 */
export function getNestedProperty<T = unknown>(obj: Record<string, unknown>, path: string): T | undefined {
  return path.split('.').reduce((prev, curr) => {
    return prev && typeof prev === 'object' && prev !== null 
      ? (prev as Record<string, unknown>)[curr]
      : undefined;
  }, obj as unknown) as T | undefined;
}