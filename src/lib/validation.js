const VALIDATION_RULES = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
    patternMessage: "Only letters, spaces, hyphens, and apostrophes allowed",
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
    patternMessage: "Only letters, spaces, hyphens, and apostrophes allowed",
  },
  completionDate: {
    required: true,
    validate: (value) => {
      const completionDate = new Date(value);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (completionDate > today) {
        return "Completion date cannot be in the future";
      }
      return null;
    },
  },
  courseLength: {
    required: true,
    minValue: 0,
    maxValue: 1000,
    validate: (value) => {
      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue <= 0) {
        return "Must be a positive number";
      }
      if (numValue > 1000) {
        return "Course length seems too high (max 1000 hours)";
      }
      return null;
    },
  },
  courseName: {
    required: true,
    minLength: 3,
    maxLength: 200,
  },
  instructor: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'.-]+$/,
    patternMessage: "Only letters, spaces, periods, hyphens, and apostrophes allowed",
  },
};

export const validateField = (name, value) => {
  const rules = VALIDATION_RULES[name];
  if (!rules) {
    if (!value || !value.toString().trim()) {
      return "This field is required";
    }
    return null;
  }

  const stringValue = value ? value.toString().trim() : "";

  if (rules.required && !stringValue) {
    return "This field is required";
  }

  if (stringValue) {
    if (rules.minLength && stringValue.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && stringValue.length > rules.maxLength) {
      return `Too long (max ${rules.maxLength} characters)`;
    }

    if (rules.pattern && !rules.pattern.test(stringValue)) {
      return rules.patternMessage || "Invalid format";
    }

    if (rules.validate) {
      return rules.validate(value);
    }
  }

  return null;
};

export const validateForm = (fields, formData) => {
  const allErrors = {};
  fields.forEach((field) => {
    const fieldErrors = validateField(field.name, formData[field.name] || "");
    if (fieldErrors) {
      allErrors[field.name] = fieldErrors;
    }
  });
  return allErrors;
};

export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};

export default VALIDATION_RULES;