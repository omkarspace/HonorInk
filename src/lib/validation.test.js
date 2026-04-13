import { describe, it, expect } from "vitest";
import { validateField, validateForm, hasErrors } from "./validation";

describe("validateField", () => {
  it("should return error for empty required field", () => {
    expect(validateField("firstName", "")).toBe("This field is required");
  });

  it("should return error for short name", () => {
    expect(validateField("firstName", "A")).toBe("Must be at least 2 characters");
  });

  it("should return error for invalid name characters", () => {
    expect(validateField("firstName", "John123")).toBe(
      "Only letters, spaces, hyphens, and apostrophes allowed"
    );
  });

  it("should return null for valid name", () => {
    expect(validateField("firstName", "John")).toBeNull();
  });

  it("should return error for future completion date", () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    expect(validateField("completionDate", futureDate.toISOString().split("T")[0])).toBe(
      "Completion date cannot be in the future"
    );
  });

  it("should return error for course length > 1000", () => {
    expect(validateField("courseLength", "1001")).toBe(
      "Course length seems too high (max 1000 hours)"
    );
  });

  it("should return null for valid course length", () => {
    expect(validateField("courseLength", "12")).toBeNull();
  });
});

describe("validateForm", () => {
  it("should return all errors for invalid form data", () => {
    const fields = [
      { name: "firstName" },
      { name: "lastName" },
      { name: "courseName" },
    ];
    const formData = {
      firstName: "",
      lastName: "A",
      courseName: "",
    };
    const errors = validateForm(fields, formData);
    expect(Object.keys(errors).length).toBe(3);
  });

  it("should return empty object for valid form data", () => {
    const fields = [
      { name: "firstName" },
      { name: "lastName" },
      { name: "courseName" },
    ];
    const formData = {
      firstName: "John",
      lastName: "Doe",
      courseName: "React Tutorial",
    };
    const errors = validateForm(fields, formData);
    expect(Object.keys(errors).length).toBe(0);
  });
});

describe("hasErrors", () => {
  it("should return true for object with errors", () => {
    expect(hasErrors({ firstName: "Required" })).toBe(true);
  });

  it("should return false for empty object", () => {
    expect(hasErrors({})).toBe(false);
  });
});