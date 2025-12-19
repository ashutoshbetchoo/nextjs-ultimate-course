import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { techMap } from "@/constants/techMap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDeviconClassName = (techName: string) => {
  const normalisedTechName = techName.replace(/[ .]/g, "").toLowerCase();

  return techMap[normalisedTechName]
    ? `${techMap[normalisedTechName]} colored`
    : "devicon-devicon-plain";
};
