
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as Indian currency (INR)
 * @param amount The amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
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
  // Handle zero case
  if (value === 0) {
    return "0";
  }
  
  // For very small numbers (that would normally be in scientific notation)
  if (Math.abs(value) < 0.001) {
    // Find the number of leading zeros after the decimal point
    const valueStr = value.toString();
    const decimalStr = valueStr.includes('e-') 
      ? '0.' + '0'.repeat(parseInt(valueStr.split('e-')[1])-1) + valueStr.split('e-')[0].replace('.', '')
      : valueStr;
    
    // Ensure we show at least 8 significant digits, which should be enough for most crypto amounts
    return decimalStr.includes('.') ? Number(value).toFixed(8) : decimalStr;
  }
  
  // For normal numbers, use standard formatting
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8, // Increased for small but not tiny numbers
  }).format(value);
}

/**
 * Gets nested object property by string path
 * @param obj The object to get the property from
 * @param path The property path (e.g., "stcg.gain")
 * @returns The property value
 */
export function getNestedProperty<T>(obj: T, path: string): unknown {
  return path.split('.').reduce((prev, curr) => {
    // If prev is null or undefined, return it
    if (prev === null || prev === undefined) return prev;
    // Otherwise access the property
    return (prev as Record<string, unknown>)[curr];
  }, obj as unknown);
}