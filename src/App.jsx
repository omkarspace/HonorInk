import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './lib/theme-provider';

const Home = lazy(() => import('./components/Home'));
const UdemyCertificate = lazy(() => import('./components/UdemyCertificate'));
const LinkedInCertificate = lazy(() => import('./components/LinkedInCertificate'));
const CourseraCertificate = lazy(() => import('./components/CourseraCertificate'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="honorink-theme">
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
            >
              Skip to main content
            </a>
            <Navbar />
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
    </ThemeProvider>
  );
}

export default App;
