import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CapFirstLetter = (str: string) => {
  return str[0]?.toUpperCase() + str.slice(1);
};

export const CapFirstLetterMulti = (str: string) => {
  return str
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
};
