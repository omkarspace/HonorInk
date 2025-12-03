<<<<<<< HEAD


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const CertificateForm = ({ onSubmit, fields, platform }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    const fieldErrors = {};

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          fieldErrors[name] = "This field is required";
        } else if (value.trim().length < 2) {
          fieldErrors[name] = "Must be at least 2 characters";
        } else if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) {
          fieldErrors[name] = "Only letters, spaces, hyphens, and apostrophes allowed";
        }
        break;

      case 'completionDate':
        if (!value) {
          fieldErrors[name] = "Completion date is required";
        } else {
          const completionDate = new Date(value);
          const today = new Date();
          today.setHours(23, 59, 59, 999); // End of today
          if (completionDate > today) {
            fieldErrors[name] = "Completion date cannot be in the future";
          }
        }
        break;

      case 'courseLength':
        if (!value) {
          fieldErrors[name] = "Course length is required";
        } else {
          const numValue = parseFloat(value);
          if (isNaN(numValue) || numValue <= 0) {
            fieldErrors[name] = "Must be a positive number";
          } else if (numValue > 1000) {
            fieldErrors[name] = "Course length seems too high (max 1000 hours)";
          }
        }
        break;

      case 'courseName':
        if (!value.trim()) {
          fieldErrors[name] = "Course name is required";
        } else if (value.trim().length < 3) {
          fieldErrors[name] = "Must be at least 3 characters";
        } else if (value.trim().length > 200) {
          fieldErrors[name] = "Course name is too long (max 200 characters)";
        }
        break;

      case 'instructor':
        if (!value.trim()) {
          fieldErrors[name] = "Instructor name is required";
        } else if (value.trim().length < 2) {
          fieldErrors[name] = "Must be at least 2 characters";
        } else if (!/^[a-zA-Z\s'.-]+$/.test(value.trim())) {
          fieldErrors[name] = "Only letters, spaces, periods, hyphens, and apostrophes allowed";
        }
        break;

      default:
        if (!value.trim()) {
          fieldErrors[name] = "This field is required";
        }
    }

    return fieldErrors;
  };

  const validateForm = (data) => {
    const allErrors = {};
    fields.forEach(field => {
      const fieldErrors = validateField(field.name, data[field.name] || '');
      Object.assign(allErrors, fieldErrors);
    });
    return allErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    const fieldErrors = validateField(name, value);
    setErrors(prev => ({ ...prev, ...fieldErrors }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = {};
    fields.forEach(field => {
      allTouched[field.name] = true;
    });
    setTouched(allTouched);

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldValue = (fieldName) => formData[fieldName] || '';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card p-6 sm:p-8 rounded-2xl shadow-xl border border-border">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {platform} Certificate
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Fill in the details below to generate your professional certificate
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {fields.map((field) => {
              const fieldValue = getFieldValue(field.name);
              const fieldError = errors[field.name];
              const isFieldTouched = touched[field.name];
              const hasError = fieldError && isFieldTouched;

              return (
                <div
                  key={field.name}
                  className={`space-y-2 ${field.type === 'textarea' ? 'sm:col-span-2' : ''}`}
                >
                  <Label
                    htmlFor={field.name}
                    className={`text-sm font-medium ${hasError ? 'text-destructive' : 'text-foreground'}`}
                  >
                    {field.label}
                    <span className="text-destructive ml-1">*</span>
                  </Label>

                  <div className="relative">
                    {field.type === "textarea" ? (
                      <Textarea
                        name={field.name}
                        id={field.name}
                        value={fieldValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        rows={4}
                        placeholder={field.placeholder}
                        className={`w-full bg-background border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring transition-all duration-200 text-base ${
                          hasError
                            ? 'border-destructive focus:border-destructive'
                            : 'border-border focus:border-primary'
                        }`}
                        aria-invalid={hasError ? 'true' : 'false'}
                        aria-describedby={hasError ? `${field.name}-error` : undefined}
                      />
                    ) : (
                      <Input
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        value={fieldValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder={field.placeholder}
                        className={`w-full bg-background border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring transition-all duration-200 text-base ${
                          hasError
                            ? 'border-destructive focus:border-destructive'
                            : 'border-border focus:border-primary'
                        }`}
                        aria-invalid={hasError ? 'true' : 'false'}
                        aria-describedby={hasError ? `${field.name}-error` : undefined}
                      />
                    )}

                    {/* Success/Error Icon */}
                    {isFieldTouched && fieldValue && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {hasError ? (
                          <AlertCircle className="w-5 h-5 text-destructive" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Error Message */}
                  {hasError && (
                    <p
                      id={`${field.name}-error`}
                      className="text-sm text-destructive flex items-center gap-1 mt-1"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {fieldError}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-base sm:text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  Generating Certificate...
                </div>
              ) : (
                "Generate Certificate"
              )}
            </Button>
          </div>
        </form>
      </div>
=======
import React from "react";

const CertificateForm = ({ onSubmit, fields, platform }) => {
  return (
    <div className="glass-card bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl w-full max-w-md mx-auto shadow-lg border border-gray-700">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8 text-center">
        {platform} Certificate
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());
          onSubmit(data);
        }}
        className="space-y-6"
      >
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-300"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                id={field.name}
                required
                rows={3}
                className="input-field w-full px-4 py-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400"
                placeholder={field.placeholder}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                required
                className="input-field w-full px-4 py-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400"
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="btn-primary w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Generate Certificate
        </button>
      </form>
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280
    </div>
  );
};

export default CertificateForm;
