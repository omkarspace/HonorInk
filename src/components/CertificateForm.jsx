import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { validateField as validateFieldFn, validateForm as validateFormFn, hasErrors } from "@/lib/validation";
import { trackFormSubmission, trackCertificateGeneration } from "@/lib/analytics";
import { logger } from "@/lib/utils";

const CertificateForm = ({ onSubmit, fields, platform }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name, value) => {
    return validateFieldFn(name, value);
  }, []);

  const validateForm = useCallback((data) => {
    return validateFormFn(fields, data);
  }, [fields]);

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

    if (hasErrors(validationErrors)) {
      trackFormSubmission(platform, false, 'Validation errors');
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
      trackFormSubmission(platform, true);
      trackCertificateGeneration(platform, true);
    } catch (error) {
      logger.error('Form submission error:', error);
      trackFormSubmission(platform, false, error.message);
      trackCertificateGeneration(platform, false);
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
    </div>
  );
};

export default CertificateForm;
