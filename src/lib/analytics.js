import * as Sentry from '@sentry/react';

export function trackPageView(pathname) {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.setTag('page', pathname);
    Sentry.captureMessage(`Page view: ${pathname}`, 'info');
  }
}

export function trackEvent(category, action, label, value) {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.captureEvent({
      level: 'info',
      tags: { category },
      extra: { action, label, value },
    });
  }
}

export function trackCertificateGeneration(certificateType, success) {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.captureEvent({
      level: success ? 'info' : 'warning',
      event_type: 'certificate_generation',
      tags: { 
        certificate_type: certificateType,
        success: success.toString(),
      },
    });
  }
}

export function trackFormSubmission(formName, success, errorMessage) {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.captureEvent({
      level: success ? 'info' : 'warning',
      event_type: 'form_submission',
      tags: { 
        form_name: formName,
        success: success.toString(),
      },
      extra: { error: errorMessage },
    });
  }
}