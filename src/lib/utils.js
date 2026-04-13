import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CERTIFICATE_ID_PREFIX } from "./constants"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const generateCertificateId = (prefix = CERTIFICATE_ID_PREFIX.UDEMY) => {
  const uuid = crypto.randomUUID().replace(/-/g, "").toUpperCase();
  return `${prefix}-${uuid}`;
};
