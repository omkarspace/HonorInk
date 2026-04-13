import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CERTIFICATE_ID_PREFIX } from "./constants"

const isDevelopment = import.meta.env.DEV

let html2canvas, html2pdf

const getPdfLibs = async () => {
  if (!html2canvas || !html2pdf) {
    const [c, p] = await Promise.all([
      import("html2canvas"),
      import("html2pdf.js"),
    ])
    html2canvas = c.default
    html2pdf = p.default
  }
  return { html2canvas, html2pdf }
}

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const generateCertificateId = (prefix = CERTIFICATE_ID_PREFIX.UDEMY) => {
  const uuid = crypto.randomUUID().replace(/-/g, "").toUpperCase();
  return `${prefix}-${uuid}`;
};

export const formatCertificateDate = (dateString) => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return formatter.format(date);
};

const appLogger = {
  error: (...args) => {
    if (isDevelopment) {
      console.error(...args)
    }
  },
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args)
    }
  },
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args)
    }
  },
}

const defaultPdfOptions = {
  margin: 0,
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: {
    scale: 2,
    useCORS: true,
    letterRendering: true,
    windowWidth: 1920,
    dpi: 300,
    logging: false,
    removeContainer: true,
  },
  jsPDF: {
    unit: "mm",
    format: "a4",
    orientation: "landscape",
    compress: true,
    precision: 16,
    putOnlyUsedFonts: true,
  },
  pagebreak: { mode: "avoid-all" },
};

export const exportToPDF = async (elementId, filename, options = {}) => {
  const { html2pdf: h2p } = await getPdfLibs()
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Certificate element not found");
  }

  const mergedOptions = {
    ...defaultPdfOptions,
    ...options,
    html2canvas: { ...defaultPdfOptions.html2canvas, ...options.html2canvas },
    jsPDF: { ...defaultPdfOptions.jsPDF, ...options.jsPDF },
    filename,
  };

  await h2p().from(element).set(mergedOptions).save();
};

export const exportToImage = async (elementId, filename, format = "png", scale = 3) => {
  const { html2canvas: h2c } = await getPdfLibs()
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Certificate element not found");
  }

  const canvas = await h2c(element, {
    scale,
    useCORS: true,
    allowTaint: false,
  });

  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL(`image/${format}`);
  link.click();
};

const MAX_STORAGE_SIZE = 4 * 1024 * 1024;

export const safeLocalStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  setItem: (key, value) => {
    try {
      const data = JSON.stringify(value);
      if (data.length > MAX_STORAGE_SIZE) {
        appLogger.warn(`Data size ${data.length} exceeds recommended limit of ${MAX_STORAGE_SIZE}`);
      }
      localStorage.setItem(key, data);
      return true;
    } catch (err) {
      if (err.name === "QuotaExceededError" || err.code === 22) {
        appLogger.error("localStorage quota exceeded");
      } else {
        appLogger.error("Failed to save to localStorage:", err);
      }
      return false;
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};

export const logger = {
  error: (...args) => {
    if (isDevelopment) {
      console.error(...args)
    }
  },
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args)
    }
  },
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args)
    }
  },
};
