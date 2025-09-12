import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getURL = process.env.URL || 'http://localhost:3000/';

export const logError = (where: string, error: unknown) =>
  console.error(`ERROR - ${where}:`, error);
