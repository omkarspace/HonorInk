import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import WelcomeModal from './components/WelcomeModal';
import CookieConsent from './components/CookieConsent';
import { trackPageView } from './lib/analytics';

const Home = lazy(() => import('./components/Home'));
const Contact = lazy(() => import('./components/Contact'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const UdemyCertificate = lazy(() => import('./components/UdemyCertificate'));
const LinkedInCertificate = lazy(() => import('./components/LinkedInCertificate'));
const CourseraCertificate = lazy(() => import('./components/CourseraCertificate'));
const NotFound = lazy(() => import('./components/NotFound'));

function PageTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <PageTracker />
        <div className="min-h-screen bg-background text-foreground">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
          >
            Skip to main content
          </a>
          <Navbar />
          <WelcomeModal />
          <CookieConsent />
          <main id="main-content" tabIndex="-1">
          <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading HonorInk...</p>
                </div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/udemy" element={<UdemyCertificate />} />
                <Route path="/linkedin" element={<LinkedInCertificate />} />
                <Route path="/coursera" element={<CourseraCertificate />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </div>
        </Router>
        </ErrorBoundary>
  );
}

export default App;
