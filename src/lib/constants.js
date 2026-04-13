export const CERTIFICATE_ID_PREFIX = {
  UDEMY: "UC",
  LINKEDIN: "LI",
  COURSERA: "CC",
};

export const VALIDATION_LIMITS = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  COURSE_NAME_MIN_LENGTH: 3,
  COURSE_NAME_MAX_LENGTH: 200,
  COURSE_LENGTH_MAX: 1000,
};

export const PDF_OPTIONS = {
  MARGIN: 0,
  IMAGE_QUALITY: 1,
  HTML2CANVAS_SCALE: 2,
  DPI: 300,
  WINDOW_WIDTH: 1920,
};

export const PDF_FORMATS = {
  IMAGE_TYPE: "jpeg",
  FORMAT: "a4",
  ORIENTATION: "landscape",
  UNIT: "mm",
};

export const CERTIFICATE_ROUTES = {
  HOME: "/",
  UDEMY: "/udemy",
  LINKEDIN: "/linkedin",
  COURSERA: "/coursera",
};

export const STORAGE_KEYS = {
  THEME: "honorink-theme",
  FORM_DRAFT: "honorink-form-draft",
};

export const DATE_FORMAT_OPTIONS = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

export const EXPORT_FORMATS = {
  PNG: "png",
  JPEG: "jpeg",
  PDF: "pdf",
};

export const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

export const CERTIFICATE_COLORS = {
  UDEMY: {
    background: "#FBF9FA",
    border: "#FFFFFF",
    text: {
      primary: "#1D1B1C",
      secondary: "#6F7681",
      tertiary: "#908E8D",
      quaternary: "#1C1C1C",
    },
  },
};

export default {
  CERTIFICATE_ID_PREFIX,
  VALIDATION_LIMITS,
  PDF_OPTIONS,
  PDF_FORMATS,
  CERTIFICATE_ROUTES,
  STORAGE_KEYS,
  DATE_FORMAT_OPTIONS,
  EXPORT_FORMATS,
  DEFAULT_ERROR_MESSAGE,
  CERTIFICATE_COLORS,
};