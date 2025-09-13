import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getURL = process.env.URL || 'http://localhost:3000';

export const logError = (where: string, error: unknown) =>
  console.error(`ERROR - ${where}:`, error);

export const toTitleCase = (str: string) =>
  str.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

export const arrayFromNumber = (n: number) =>
  Array.from({ length: n }).map((_, i) => i);

export const formatPokemonId = (id: number) =>
  `#${id.toString().padStart(3, '0')}`;
